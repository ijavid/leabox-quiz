import 'reflect-metadata';
import {ReflectiveInjector} from "injection-js";
import {ResourceBaseType, RouteDef} from "./resource.type";


// Decorators
export const Resource = resource;
export const Route = route;

// singleton
export const singleton: { injector: ReflectiveInjector, resources: ResourceBase[] } = {
    injector: undefined,
    resources: []
};

const RESOURCE_ROUTES_META_KEY = 'RESOURCE_ROUTES_META_KEY';

export abstract class ResourceBase implements ResourceBaseType {

    _namespace: string;

    public getRoutes(): Array<RouteDef> {
        const metadata = Reflect.getMetadata(RESOURCE_ROUTES_META_KEY, this.constructor) || {};
        // console.log(metadata);
        return Object.keys(metadata).map((key) => {
            let {path, method, handler} = metadata[key];
            if (this._namespace) {
                path = this._namespace + path;
            }
            handler = handler.bind(this);
            return {path, method, handler}
        })
    }
}

// Method decorator
function route(path: string, method = 'get') {
    method = method.toLowerCase();
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const classConstructor = target.constructor;
        const metadata = Reflect.getMetadata(RESOURCE_ROUTES_META_KEY, classConstructor) || {};
        metadata[propertyKey] = {path, method, handler: descriptor.value};
        Reflect.defineMetadata(RESOURCE_ROUTES_META_KEY, metadata, classConstructor);

        descriptor.value = descriptor.value.bind(classConstructor);
        return descriptor;
    }
}

// Class decorator
function resource(namespace = ''): ClassDecorator {
    return <ClassDecorator>function (target: any) {
        // save a reference to the original constructor
        const original = target;

        // the new constructor behaviour
        const newConstructor: any = function (...args: any[]) {
            const instance = singleton.injector ? singleton.injector.resolveAndInstantiate(original) : new original(...args);
            instance._namespace = namespace;
            return instance;
        };

        // copy prototype, so intanceof operator still works
        newConstructor.prototype = original.prototype;
        // newConstructor._name = original.name;  >>> type.prototype.constructor.name

        // register to singleton
        singleton.resources.push(original);

        return newConstructor;
    }
}

/*
// move to readme.md

//-----
@Resource('resource')
export class A extends ResourceBase {
    @Route('/test', 'GET')
    someMethod() {
        return Promise.resolve('hello');
    }
}
/*
console.log('call create');
const a = new A();
console.log(a);
console.log('call method');
a.someMethod();

console.log(a instanceof A);

// Class decor for all methods
// https://stackoverflow.com/questions/47621364/js-ts-apply-decorator-to-all-methods-enumerate-class-methods
function log(target: Function) {
    console.log(target);
    for (const propertyName of Object.keys(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        const isMethod = descriptor.value instanceof Function;
        console.log('--');
        console.log(descriptor);
        if (!isMethod)
            continue;

        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.log("The method args are: " + JSON.stringify(args));
            const result = originalMethod.apply(this, args);
            console.log("The return value is: " + result);
            return result;
        };

        Object.defineProperty(target.prototype, propertyName, descriptor);
    }
}

// const a = new A();
console.log('xxxxxxxxxxxxxx');
console.log(a.getRoutes());


console.log('xxx');
console.log(getResources());
console.log('xxxxxx');
getResources().forEach((clazz: any) => {
    const a = new clazz() as ResourceBase;
    console.log(clazz.name);
    console.log(a.getRoutes());
});*/
