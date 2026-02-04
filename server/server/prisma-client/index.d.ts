
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Connection
 * 
 */
export type Connection = $Result.DefaultSelection<Prisma.$ConnectionPayload>
/**
 * Model Canvas
 * 
 */
export type Canvas = $Result.DefaultSelection<Prisma.$CanvasPayload>
/**
 * Model TableRelationship
 * 
 */
export type TableRelationship = $Result.DefaultSelection<Prisma.$TableRelationshipPayload>
/**
 * Model PatternRule
 * 
 */
export type PatternRule = $Result.DefaultSelection<Prisma.$PatternRulePayload>
/**
 * Model DeepQuery
 * 
 */
export type DeepQuery = $Result.DefaultSelection<Prisma.$DeepQueryPayload>
/**
 * Model QueryCache
 * 
 */
export type QueryCache = $Result.DefaultSelection<Prisma.$QueryCachePayload>
/**
 * Model ColumnProfile
 * 
 */
export type ColumnProfile = $Result.DefaultSelection<Prisma.$ColumnProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TableRelationshipType: {
  ONE_TO_ONE: 'ONE_TO_ONE',
  ONE_TO_MANY: 'ONE_TO_MANY',
  MANY_TO_ONE: 'MANY_TO_ONE',
  MANY_TO_MANY: 'MANY_TO_MANY'
};

export type TableRelationshipType = (typeof TableRelationshipType)[keyof typeof TableRelationshipType]


export const DetectionMethod: {
  FOREIGN_KEY: 'FOREIGN_KEY',
  NAMING_CONVENTION: 'NAMING_CONVENTION',
  PATTERN_MATCHING: 'PATTERN_MATCHING',
  MANUAL: 'MANUAL',
  INFERRED: 'INFERRED'
};

export type DetectionMethod = (typeof DetectionMethod)[keyof typeof DetectionMethod]

}

export type TableRelationshipType = $Enums.TableRelationshipType

export const TableRelationshipType: typeof $Enums.TableRelationshipType

export type DetectionMethod = $Enums.DetectionMethod

export const DetectionMethod: typeof $Enums.DetectionMethod

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.connection`: Exposes CRUD operations for the **Connection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Connections
    * const connections = await prisma.connection.findMany()
    * ```
    */
  get connection(): Prisma.ConnectionDelegate<ExtArgs>;

  /**
   * `prisma.canvas`: Exposes CRUD operations for the **Canvas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Canvas
    * const canvas = await prisma.canvas.findMany()
    * ```
    */
  get canvas(): Prisma.CanvasDelegate<ExtArgs>;

  /**
   * `prisma.tableRelationship`: Exposes CRUD operations for the **TableRelationship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TableRelationships
    * const tableRelationships = await prisma.tableRelationship.findMany()
    * ```
    */
  get tableRelationship(): Prisma.TableRelationshipDelegate<ExtArgs>;

  /**
   * `prisma.patternRule`: Exposes CRUD operations for the **PatternRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatternRules
    * const patternRules = await prisma.patternRule.findMany()
    * ```
    */
  get patternRule(): Prisma.PatternRuleDelegate<ExtArgs>;

  /**
   * `prisma.deepQuery`: Exposes CRUD operations for the **DeepQuery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeepQueries
    * const deepQueries = await prisma.deepQuery.findMany()
    * ```
    */
  get deepQuery(): Prisma.DeepQueryDelegate<ExtArgs>;

  /**
   * `prisma.queryCache`: Exposes CRUD operations for the **QueryCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueryCaches
    * const queryCaches = await prisma.queryCache.findMany()
    * ```
    */
  get queryCache(): Prisma.QueryCacheDelegate<ExtArgs>;

  /**
   * `prisma.columnProfile`: Exposes CRUD operations for the **ColumnProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ColumnProfiles
    * const columnProfiles = await prisma.columnProfile.findMany()
    * ```
    */
  get columnProfile(): Prisma.ColumnProfileDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Connection: 'Connection',
    Canvas: 'Canvas',
    TableRelationship: 'TableRelationship',
    PatternRule: 'PatternRule',
    DeepQuery: 'DeepQuery',
    QueryCache: 'QueryCache',
    ColumnProfile: 'ColumnProfile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "connection" | "canvas" | "tableRelationship" | "patternRule" | "deepQuery" | "queryCache" | "columnProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Connection: {
        payload: Prisma.$ConnectionPayload<ExtArgs>
        fields: Prisma.ConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findFirst: {
            args: Prisma.ConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findMany: {
            args: Prisma.ConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          create: {
            args: Prisma.ConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          createMany: {
            args: Prisma.ConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          delete: {
            args: Prisma.ConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          update: {
            args: Prisma.ConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          aggregate: {
            args: Prisma.ConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnection>
          }
          groupBy: {
            args: Prisma.ConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectionCountAggregateOutputType> | number
          }
        }
      }
      Canvas: {
        payload: Prisma.$CanvasPayload<ExtArgs>
        fields: Prisma.CanvasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CanvasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CanvasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          findFirst: {
            args: Prisma.CanvasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CanvasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          findMany: {
            args: Prisma.CanvasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>[]
          }
          create: {
            args: Prisma.CanvasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          createMany: {
            args: Prisma.CanvasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CanvasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>[]
          }
          delete: {
            args: Prisma.CanvasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          update: {
            args: Prisma.CanvasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          deleteMany: {
            args: Prisma.CanvasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CanvasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CanvasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CanvasPayload>
          }
          aggregate: {
            args: Prisma.CanvasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCanvas>
          }
          groupBy: {
            args: Prisma.CanvasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CanvasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CanvasCountArgs<ExtArgs>
            result: $Utils.Optional<CanvasCountAggregateOutputType> | number
          }
        }
      }
      TableRelationship: {
        payload: Prisma.$TableRelationshipPayload<ExtArgs>
        fields: Prisma.TableRelationshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableRelationshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableRelationshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          findFirst: {
            args: Prisma.TableRelationshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableRelationshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          findMany: {
            args: Prisma.TableRelationshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>[]
          }
          create: {
            args: Prisma.TableRelationshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          createMany: {
            args: Prisma.TableRelationshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableRelationshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>[]
          }
          delete: {
            args: Prisma.TableRelationshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          update: {
            args: Prisma.TableRelationshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          deleteMany: {
            args: Prisma.TableRelationshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableRelationshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TableRelationshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TableRelationshipPayload>
          }
          aggregate: {
            args: Prisma.TableRelationshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTableRelationship>
          }
          groupBy: {
            args: Prisma.TableRelationshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableRelationshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableRelationshipCountArgs<ExtArgs>
            result: $Utils.Optional<TableRelationshipCountAggregateOutputType> | number
          }
        }
      }
      PatternRule: {
        payload: Prisma.$PatternRulePayload<ExtArgs>
        fields: Prisma.PatternRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatternRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatternRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          findFirst: {
            args: Prisma.PatternRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatternRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          findMany: {
            args: Prisma.PatternRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>[]
          }
          create: {
            args: Prisma.PatternRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          createMany: {
            args: Prisma.PatternRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatternRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>[]
          }
          delete: {
            args: Prisma.PatternRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          update: {
            args: Prisma.PatternRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          deleteMany: {
            args: Prisma.PatternRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatternRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatternRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatternRulePayload>
          }
          aggregate: {
            args: Prisma.PatternRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatternRule>
          }
          groupBy: {
            args: Prisma.PatternRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatternRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatternRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PatternRuleCountAggregateOutputType> | number
          }
        }
      }
      DeepQuery: {
        payload: Prisma.$DeepQueryPayload<ExtArgs>
        fields: Prisma.DeepQueryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeepQueryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeepQueryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          findFirst: {
            args: Prisma.DeepQueryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeepQueryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          findMany: {
            args: Prisma.DeepQueryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>[]
          }
          create: {
            args: Prisma.DeepQueryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          createMany: {
            args: Prisma.DeepQueryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeepQueryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>[]
          }
          delete: {
            args: Prisma.DeepQueryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          update: {
            args: Prisma.DeepQueryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          deleteMany: {
            args: Prisma.DeepQueryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeepQueryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeepQueryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeepQueryPayload>
          }
          aggregate: {
            args: Prisma.DeepQueryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeepQuery>
          }
          groupBy: {
            args: Prisma.DeepQueryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeepQueryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeepQueryCountArgs<ExtArgs>
            result: $Utils.Optional<DeepQueryCountAggregateOutputType> | number
          }
        }
      }
      QueryCache: {
        payload: Prisma.$QueryCachePayload<ExtArgs>
        fields: Prisma.QueryCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueryCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueryCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          findFirst: {
            args: Prisma.QueryCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueryCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          findMany: {
            args: Prisma.QueryCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>[]
          }
          create: {
            args: Prisma.QueryCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          createMany: {
            args: Prisma.QueryCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueryCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>[]
          }
          delete: {
            args: Prisma.QueryCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          update: {
            args: Prisma.QueryCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          deleteMany: {
            args: Prisma.QueryCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueryCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QueryCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryCachePayload>
          }
          aggregate: {
            args: Prisma.QueryCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueryCache>
          }
          groupBy: {
            args: Prisma.QueryCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueryCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueryCacheCountArgs<ExtArgs>
            result: $Utils.Optional<QueryCacheCountAggregateOutputType> | number
          }
        }
      }
      ColumnProfile: {
        payload: Prisma.$ColumnProfilePayload<ExtArgs>
        fields: Prisma.ColumnProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColumnProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColumnProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          findFirst: {
            args: Prisma.ColumnProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColumnProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          findMany: {
            args: Prisma.ColumnProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>[]
          }
          create: {
            args: Prisma.ColumnProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          createMany: {
            args: Prisma.ColumnProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColumnProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>[]
          }
          delete: {
            args: Prisma.ColumnProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          update: {
            args: Prisma.ColumnProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          deleteMany: {
            args: Prisma.ColumnProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColumnProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ColumnProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnProfilePayload>
          }
          aggregate: {
            args: Prisma.ColumnProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColumnProfile>
          }
          groupBy: {
            args: Prisma.ColumnProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColumnProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColumnProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ColumnProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    connections: number
    canvases: number
    tableRelationships: number
    patternRules: number
    deepQueries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | UserCountOutputTypeCountConnectionsArgs
    canvases?: boolean | UserCountOutputTypeCountCanvasesArgs
    tableRelationships?: boolean | UserCountOutputTypeCountTableRelationshipsArgs
    patternRules?: boolean | UserCountOutputTypeCountPatternRulesArgs
    deepQueries?: boolean | UserCountOutputTypeCountDeepQueriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCanvasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableRelationshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatternRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatternRuleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDeepQueriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeepQueryWhereInput
  }


  /**
   * Count Type ConnectionCountOutputType
   */

  export type ConnectionCountOutputType = {
    canvases: number
    tableRelationships: number
    patternRules: number
    deepQueries: number
    queryCaches: number
    columnProfiles: number
  }

  export type ConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    canvases?: boolean | ConnectionCountOutputTypeCountCanvasesArgs
    tableRelationships?: boolean | ConnectionCountOutputTypeCountTableRelationshipsArgs
    patternRules?: boolean | ConnectionCountOutputTypeCountPatternRulesArgs
    deepQueries?: boolean | ConnectionCountOutputTypeCountDeepQueriesArgs
    queryCaches?: boolean | ConnectionCountOutputTypeCountQueryCachesArgs
    columnProfiles?: boolean | ConnectionCountOutputTypeCountColumnProfilesArgs
  }

  // Custom InputTypes
  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionCountOutputType
     */
    select?: ConnectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountCanvasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountTableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableRelationshipWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountPatternRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatternRuleWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountDeepQueriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeepQueryWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountQueryCachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueryCacheWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountColumnProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnProfileWhereInput
  }


  /**
   * Count Type PatternRuleCountOutputType
   */

  export type PatternRuleCountOutputType = {
    tableRelationships: number
  }

  export type PatternRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tableRelationships?: boolean | PatternRuleCountOutputTypeCountTableRelationshipsArgs
  }

  // Custom InputTypes
  /**
   * PatternRuleCountOutputType without action
   */
  export type PatternRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRuleCountOutputType
     */
    select?: PatternRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatternRuleCountOutputType without action
   */
  export type PatternRuleCountOutputTypeCountTableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableRelationshipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    connections?: boolean | User$connectionsArgs<ExtArgs>
    canvases?: boolean | User$canvasesArgs<ExtArgs>
    tableRelationships?: boolean | User$tableRelationshipsArgs<ExtArgs>
    patternRules?: boolean | User$patternRulesArgs<ExtArgs>
    deepQueries?: boolean | User$deepQueriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | User$connectionsArgs<ExtArgs>
    canvases?: boolean | User$canvasesArgs<ExtArgs>
    tableRelationships?: boolean | User$tableRelationshipsArgs<ExtArgs>
    patternRules?: boolean | User$patternRulesArgs<ExtArgs>
    deepQueries?: boolean | User$deepQueriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      connections: Prisma.$ConnectionPayload<ExtArgs>[]
      canvases: Prisma.$CanvasPayload<ExtArgs>[]
      tableRelationships: Prisma.$TableRelationshipPayload<ExtArgs>[]
      patternRules: Prisma.$PatternRulePayload<ExtArgs>[]
      deepQueries: Prisma.$DeepQueryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connections<T extends User$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany"> | Null>
    canvases<T extends User$canvasesArgs<ExtArgs> = {}>(args?: Subset<T, User$canvasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findMany"> | Null>
    tableRelationships<T extends User$tableRelationshipsArgs<ExtArgs> = {}>(args?: Subset<T, User$tableRelationshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findMany"> | Null>
    patternRules<T extends User$patternRulesArgs<ExtArgs> = {}>(args?: Subset<T, User$patternRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findMany"> | Null>
    deepQueries<T extends User$deepQueriesArgs<ExtArgs> = {}>(args?: Subset<T, User$deepQueriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.connections
   */
  export type User$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    cursor?: ConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * User.canvases
   */
  export type User$canvasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    where?: CanvasWhereInput
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    cursor?: CanvasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * User.tableRelationships
   */
  export type User$tableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    where?: TableRelationshipWhereInput
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    cursor?: TableRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * User.patternRules
   */
  export type User$patternRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    where?: PatternRuleWhereInput
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    cursor?: PatternRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatternRuleScalarFieldEnum | PatternRuleScalarFieldEnum[]
  }

  /**
   * User.deepQueries
   */
  export type User$deepQueriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    where?: DeepQueryWhereInput
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    cursor?: DeepQueryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeepQueryScalarFieldEnum | DeepQueryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Connection
   */

  export type AggregateConnection = {
    _count: ConnectionCountAggregateOutputType | null
    _avg: ConnectionAvgAggregateOutputType | null
    _sum: ConnectionSumAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  export type ConnectionAvgAggregateOutputType = {
    id: number | null
    port: number | null
    ownerId: number | null
  }

  export type ConnectionSumAggregateOutputType = {
    id: number | null
    port: number | null
    ownerId: number | null
  }

  export type ConnectionMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    host: string | null
    port: number | null
    user: string | null
    password: string | null
    database: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type ConnectionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    host: string | null
    port: number | null
    user: string | null
    password: string | null
    database: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type ConnectionCountAggregateOutputType = {
    id: number
    name: number
    type: number
    host: number
    port: number
    user: number
    password: number
    database: number
    createdAt: number
    updatedAt: number
    ownerId: number
    _all: number
  }


  export type ConnectionAvgAggregateInputType = {
    id?: true
    port?: true
    ownerId?: true
  }

  export type ConnectionSumAggregateInputType = {
    id?: true
    port?: true
    ownerId?: true
  }

  export type ConnectionMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    host?: true
    port?: true
    user?: true
    password?: true
    database?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type ConnectionMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    host?: true
    port?: true
    user?: true
    password?: true
    database?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type ConnectionCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    host?: true
    port?: true
    user?: true
    password?: true
    database?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    _all?: true
  }

  export type ConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connection to aggregate.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Connections
    **/
    _count?: true | ConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConnectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConnectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectionMaxAggregateInputType
  }

  export type GetConnectionAggregateType<T extends ConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnection[P]>
      : GetScalarType<T[P], AggregateConnection[P]>
  }




  export type ConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithAggregationInput | ConnectionOrderByWithAggregationInput[]
    by: ConnectionScalarFieldEnum[] | ConnectionScalarFieldEnum
    having?: ConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectionCountAggregateInputType | true
    _avg?: ConnectionAvgAggregateInputType
    _sum?: ConnectionSumAggregateInputType
    _min?: ConnectionMinAggregateInputType
    _max?: ConnectionMaxAggregateInputType
  }

  export type ConnectionGroupByOutputType = {
    id: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt: Date
    updatedAt: Date
    ownerId: number | null
    _count: ConnectionCountAggregateOutputType | null
    _avg: ConnectionAvgAggregateOutputType | null
    _sum: ConnectionSumAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  type GetConnectionGroupByPayload<T extends ConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    host?: boolean
    port?: boolean
    user?: boolean
    password?: boolean
    database?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    canvases?: boolean | Connection$canvasesArgs<ExtArgs>
    owner?: boolean | Connection$ownerArgs<ExtArgs>
    tableRelationships?: boolean | Connection$tableRelationshipsArgs<ExtArgs>
    patternRules?: boolean | Connection$patternRulesArgs<ExtArgs>
    deepQueries?: boolean | Connection$deepQueriesArgs<ExtArgs>
    queryCaches?: boolean | Connection$queryCachesArgs<ExtArgs>
    columnProfiles?: boolean | Connection$columnProfilesArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    host?: boolean
    port?: boolean
    user?: boolean
    password?: boolean
    database?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    owner?: boolean | Connection$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    host?: boolean
    port?: boolean
    user?: boolean
    password?: boolean
    database?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
  }

  export type ConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    canvases?: boolean | Connection$canvasesArgs<ExtArgs>
    owner?: boolean | Connection$ownerArgs<ExtArgs>
    tableRelationships?: boolean | Connection$tableRelationshipsArgs<ExtArgs>
    patternRules?: boolean | Connection$patternRulesArgs<ExtArgs>
    deepQueries?: boolean | Connection$deepQueriesArgs<ExtArgs>
    queryCaches?: boolean | Connection$queryCachesArgs<ExtArgs>
    columnProfiles?: boolean | Connection$columnProfilesArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Connection$ownerArgs<ExtArgs>
  }

  export type $ConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Connection"
    objects: {
      canvases: Prisma.$CanvasPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs> | null
      tableRelationships: Prisma.$TableRelationshipPayload<ExtArgs>[]
      patternRules: Prisma.$PatternRulePayload<ExtArgs>[]
      deepQueries: Prisma.$DeepQueryPayload<ExtArgs>[]
      queryCaches: Prisma.$QueryCachePayload<ExtArgs>[]
      columnProfiles: Prisma.$ColumnProfilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      type: string
      host: string
      port: number
      user: string
      password: string
      database: string
      createdAt: Date
      updatedAt: Date
      ownerId: number | null
    }, ExtArgs["result"]["connection"]>
    composites: {}
  }

  type ConnectionGetPayload<S extends boolean | null | undefined | ConnectionDefaultArgs> = $Result.GetResult<Prisma.$ConnectionPayload, S>

  type ConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConnectionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConnectionCountAggregateInputType | true
    }

  export interface ConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Connection'], meta: { name: 'Connection' } }
    /**
     * Find zero or one Connection that matches the filter.
     * @param {ConnectionFindUniqueArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectionFindUniqueArgs>(args: SelectSubset<T, ConnectionFindUniqueArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Connection that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConnectionFindUniqueOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Connection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectionFindFirstArgs>(args?: SelectSubset<T, ConnectionFindFirstArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Connection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Connections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Connections
     * const connections = await prisma.connection.findMany()
     * 
     * // Get first 10 Connections
     * const connections = await prisma.connection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectionWithIdOnly = await prisma.connection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectionFindManyArgs>(args?: SelectSubset<T, ConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Connection.
     * @param {ConnectionCreateArgs} args - Arguments to create a Connection.
     * @example
     * // Create one Connection
     * const Connection = await prisma.connection.create({
     *   data: {
     *     // ... data to create a Connection
     *   }
     * })
     * 
     */
    create<T extends ConnectionCreateArgs>(args: SelectSubset<T, ConnectionCreateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Connections.
     * @param {ConnectionCreateManyArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectionCreateManyArgs>(args?: SelectSubset<T, ConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Connections and returns the data saved in the database.
     * @param {ConnectionCreateManyAndReturnArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Connection.
     * @param {ConnectionDeleteArgs} args - Arguments to delete one Connection.
     * @example
     * // Delete one Connection
     * const Connection = await prisma.connection.delete({
     *   where: {
     *     // ... filter to delete one Connection
     *   }
     * })
     * 
     */
    delete<T extends ConnectionDeleteArgs>(args: SelectSubset<T, ConnectionDeleteArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Connection.
     * @param {ConnectionUpdateArgs} args - Arguments to update one Connection.
     * @example
     * // Update one Connection
     * const connection = await prisma.connection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectionUpdateArgs>(args: SelectSubset<T, ConnectionUpdateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Connections.
     * @param {ConnectionDeleteManyArgs} args - Arguments to filter Connections to delete.
     * @example
     * // Delete a few Connections
     * const { count } = await prisma.connection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectionDeleteManyArgs>(args?: SelectSubset<T, ConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectionUpdateManyArgs>(args: SelectSubset<T, ConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Connection.
     * @param {ConnectionUpsertArgs} args - Arguments to update or create a Connection.
     * @example
     * // Update or create a Connection
     * const connection = await prisma.connection.upsert({
     *   create: {
     *     // ... data to create a Connection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Connection we want to update
     *   }
     * })
     */
    upsert<T extends ConnectionUpsertArgs>(args: SelectSubset<T, ConnectionUpsertArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionCountArgs} args - Arguments to filter Connections to count.
     * @example
     * // Count the number of Connections
     * const count = await prisma.connection.count({
     *   where: {
     *     // ... the filter for the Connections we want to count
     *   }
     * })
    **/
    count<T extends ConnectionCountArgs>(
      args?: Subset<T, ConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectionAggregateArgs>(args: Subset<T, ConnectionAggregateArgs>): Prisma.PrismaPromise<GetConnectionAggregateType<T>>

    /**
     * Group by Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Connection model
   */
  readonly fields: ConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Connection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    canvases<T extends Connection$canvasesArgs<ExtArgs> = {}>(args?: Subset<T, Connection$canvasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findMany"> | Null>
    owner<T extends Connection$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Connection$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tableRelationships<T extends Connection$tableRelationshipsArgs<ExtArgs> = {}>(args?: Subset<T, Connection$tableRelationshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findMany"> | Null>
    patternRules<T extends Connection$patternRulesArgs<ExtArgs> = {}>(args?: Subset<T, Connection$patternRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findMany"> | Null>
    deepQueries<T extends Connection$deepQueriesArgs<ExtArgs> = {}>(args?: Subset<T, Connection$deepQueriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findMany"> | Null>
    queryCaches<T extends Connection$queryCachesArgs<ExtArgs> = {}>(args?: Subset<T, Connection$queryCachesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findMany"> | Null>
    columnProfiles<T extends Connection$columnProfilesArgs<ExtArgs> = {}>(args?: Subset<T, Connection$columnProfilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Connection model
   */ 
  interface ConnectionFieldRefs {
    readonly id: FieldRef<"Connection", 'Int'>
    readonly name: FieldRef<"Connection", 'String'>
    readonly type: FieldRef<"Connection", 'String'>
    readonly host: FieldRef<"Connection", 'String'>
    readonly port: FieldRef<"Connection", 'Int'>
    readonly user: FieldRef<"Connection", 'String'>
    readonly password: FieldRef<"Connection", 'String'>
    readonly database: FieldRef<"Connection", 'String'>
    readonly createdAt: FieldRef<"Connection", 'DateTime'>
    readonly updatedAt: FieldRef<"Connection", 'DateTime'>
    readonly ownerId: FieldRef<"Connection", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Connection findUnique
   */
  export type ConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findUniqueOrThrow
   */
  export type ConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findFirst
   */
  export type ConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findFirstOrThrow
   */
  export type ConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findMany
   */
  export type ConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connections to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection create
   */
  export type ConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Connection.
     */
    data: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
  }

  /**
   * Connection createMany
   */
  export type ConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Connection createManyAndReturn
   */
  export type ConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection update
   */
  export type ConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Connection.
     */
    data: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
    /**
     * Choose, which Connection to update.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection updateMany
   */
  export type ConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
  }

  /**
   * Connection upsert
   */
  export type ConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Connection to update in case it exists.
     */
    where: ConnectionWhereUniqueInput
    /**
     * In case the Connection found by the `where` argument doesn't exist, create a new Connection with this data.
     */
    create: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
    /**
     * In case the Connection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
  }

  /**
   * Connection delete
   */
  export type ConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter which Connection to delete.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection deleteMany
   */
  export type ConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connections to delete
     */
    where?: ConnectionWhereInput
  }

  /**
   * Connection.canvases
   */
  export type Connection$canvasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    where?: CanvasWhereInput
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    cursor?: CanvasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Connection.owner
   */
  export type Connection$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Connection.tableRelationships
   */
  export type Connection$tableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    where?: TableRelationshipWhereInput
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    cursor?: TableRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * Connection.patternRules
   */
  export type Connection$patternRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    where?: PatternRuleWhereInput
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    cursor?: PatternRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatternRuleScalarFieldEnum | PatternRuleScalarFieldEnum[]
  }

  /**
   * Connection.deepQueries
   */
  export type Connection$deepQueriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    where?: DeepQueryWhereInput
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    cursor?: DeepQueryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeepQueryScalarFieldEnum | DeepQueryScalarFieldEnum[]
  }

  /**
   * Connection.queryCaches
   */
  export type Connection$queryCachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    where?: QueryCacheWhereInput
    orderBy?: QueryCacheOrderByWithRelationInput | QueryCacheOrderByWithRelationInput[]
    cursor?: QueryCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueryCacheScalarFieldEnum | QueryCacheScalarFieldEnum[]
  }

  /**
   * Connection.columnProfiles
   */
  export type Connection$columnProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    where?: ColumnProfileWhereInput
    orderBy?: ColumnProfileOrderByWithRelationInput | ColumnProfileOrderByWithRelationInput[]
    cursor?: ColumnProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ColumnProfileScalarFieldEnum | ColumnProfileScalarFieldEnum[]
  }

  /**
   * Connection without action
   */
  export type ConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Canvas
   */

  export type AggregateCanvas = {
    _count: CanvasCountAggregateOutputType | null
    _avg: CanvasAvgAggregateOutputType | null
    _sum: CanvasSumAggregateOutputType | null
    _min: CanvasMinAggregateOutputType | null
    _max: CanvasMaxAggregateOutputType | null
  }

  export type CanvasAvgAggregateOutputType = {
    id: number | null
    connectionId: number | null
    ownerId: number | null
  }

  export type CanvasSumAggregateOutputType = {
    id: number | null
    connectionId: number | null
    ownerId: number | null
  }

  export type CanvasMinAggregateOutputType = {
    id: number | null
    name: string | null
    connectionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type CanvasMaxAggregateOutputType = {
    id: number | null
    name: string | null
    connectionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type CanvasCountAggregateOutputType = {
    id: number
    name: number
    data: number
    connectionId: number
    createdAt: number
    updatedAt: number
    ownerId: number
    _all: number
  }


  export type CanvasAvgAggregateInputType = {
    id?: true
    connectionId?: true
    ownerId?: true
  }

  export type CanvasSumAggregateInputType = {
    id?: true
    connectionId?: true
    ownerId?: true
  }

  export type CanvasMinAggregateInputType = {
    id?: true
    name?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type CanvasMaxAggregateInputType = {
    id?: true
    name?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type CanvasCountAggregateInputType = {
    id?: true
    name?: true
    data?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    _all?: true
  }

  export type CanvasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Canvas to aggregate.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Canvas
    **/
    _count?: true | CanvasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CanvasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CanvasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CanvasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CanvasMaxAggregateInputType
  }

  export type GetCanvasAggregateType<T extends CanvasAggregateArgs> = {
        [P in keyof T & keyof AggregateCanvas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCanvas[P]>
      : GetScalarType<T[P], AggregateCanvas[P]>
  }




  export type CanvasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CanvasWhereInput
    orderBy?: CanvasOrderByWithAggregationInput | CanvasOrderByWithAggregationInput[]
    by: CanvasScalarFieldEnum[] | CanvasScalarFieldEnum
    having?: CanvasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CanvasCountAggregateInputType | true
    _avg?: CanvasAvgAggregateInputType
    _sum?: CanvasSumAggregateInputType
    _min?: CanvasMinAggregateInputType
    _max?: CanvasMaxAggregateInputType
  }

  export type CanvasGroupByOutputType = {
    id: number
    name: string
    data: JsonValue
    connectionId: number | null
    createdAt: Date
    updatedAt: Date
    ownerId: number | null
    _count: CanvasCountAggregateOutputType | null
    _avg: CanvasAvgAggregateOutputType | null
    _sum: CanvasSumAggregateOutputType | null
    _min: CanvasMinAggregateOutputType | null
    _max: CanvasMaxAggregateOutputType | null
  }

  type GetCanvasGroupByPayload<T extends CanvasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CanvasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CanvasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CanvasGroupByOutputType[P]>
            : GetScalarType<T[P], CanvasGroupByOutputType[P]>
        }
      >
    >


  export type CanvasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    data?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    connection?: boolean | Canvas$connectionArgs<ExtArgs>
    owner?: boolean | Canvas$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["canvas"]>

  export type CanvasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    data?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    connection?: boolean | Canvas$connectionArgs<ExtArgs>
    owner?: boolean | Canvas$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["canvas"]>

  export type CanvasSelectScalar = {
    id?: boolean
    name?: boolean
    data?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
  }

  export type CanvasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | Canvas$connectionArgs<ExtArgs>
    owner?: boolean | Canvas$ownerArgs<ExtArgs>
  }
  export type CanvasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | Canvas$connectionArgs<ExtArgs>
    owner?: boolean | Canvas$ownerArgs<ExtArgs>
  }

  export type $CanvasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Canvas"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs> | null
      owner: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      data: Prisma.JsonValue
      connectionId: number | null
      createdAt: Date
      updatedAt: Date
      ownerId: number | null
    }, ExtArgs["result"]["canvas"]>
    composites: {}
  }

  type CanvasGetPayload<S extends boolean | null | undefined | CanvasDefaultArgs> = $Result.GetResult<Prisma.$CanvasPayload, S>

  type CanvasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CanvasFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CanvasCountAggregateInputType | true
    }

  export interface CanvasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Canvas'], meta: { name: 'Canvas' } }
    /**
     * Find zero or one Canvas that matches the filter.
     * @param {CanvasFindUniqueArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CanvasFindUniqueArgs>(args: SelectSubset<T, CanvasFindUniqueArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Canvas that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CanvasFindUniqueOrThrowArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CanvasFindUniqueOrThrowArgs>(args: SelectSubset<T, CanvasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Canvas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindFirstArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CanvasFindFirstArgs>(args?: SelectSubset<T, CanvasFindFirstArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Canvas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindFirstOrThrowArgs} args - Arguments to find a Canvas
     * @example
     * // Get one Canvas
     * const canvas = await prisma.canvas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CanvasFindFirstOrThrowArgs>(args?: SelectSubset<T, CanvasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Canvas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Canvas
     * const canvas = await prisma.canvas.findMany()
     * 
     * // Get first 10 Canvas
     * const canvas = await prisma.canvas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const canvasWithIdOnly = await prisma.canvas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CanvasFindManyArgs>(args?: SelectSubset<T, CanvasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Canvas.
     * @param {CanvasCreateArgs} args - Arguments to create a Canvas.
     * @example
     * // Create one Canvas
     * const Canvas = await prisma.canvas.create({
     *   data: {
     *     // ... data to create a Canvas
     *   }
     * })
     * 
     */
    create<T extends CanvasCreateArgs>(args: SelectSubset<T, CanvasCreateArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Canvas.
     * @param {CanvasCreateManyArgs} args - Arguments to create many Canvas.
     * @example
     * // Create many Canvas
     * const canvas = await prisma.canvas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CanvasCreateManyArgs>(args?: SelectSubset<T, CanvasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Canvas and returns the data saved in the database.
     * @param {CanvasCreateManyAndReturnArgs} args - Arguments to create many Canvas.
     * @example
     * // Create many Canvas
     * const canvas = await prisma.canvas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Canvas and only return the `id`
     * const canvasWithIdOnly = await prisma.canvas.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CanvasCreateManyAndReturnArgs>(args?: SelectSubset<T, CanvasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Canvas.
     * @param {CanvasDeleteArgs} args - Arguments to delete one Canvas.
     * @example
     * // Delete one Canvas
     * const Canvas = await prisma.canvas.delete({
     *   where: {
     *     // ... filter to delete one Canvas
     *   }
     * })
     * 
     */
    delete<T extends CanvasDeleteArgs>(args: SelectSubset<T, CanvasDeleteArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Canvas.
     * @param {CanvasUpdateArgs} args - Arguments to update one Canvas.
     * @example
     * // Update one Canvas
     * const canvas = await prisma.canvas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CanvasUpdateArgs>(args: SelectSubset<T, CanvasUpdateArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Canvas.
     * @param {CanvasDeleteManyArgs} args - Arguments to filter Canvas to delete.
     * @example
     * // Delete a few Canvas
     * const { count } = await prisma.canvas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CanvasDeleteManyArgs>(args?: SelectSubset<T, CanvasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Canvas
     * const canvas = await prisma.canvas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CanvasUpdateManyArgs>(args: SelectSubset<T, CanvasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Canvas.
     * @param {CanvasUpsertArgs} args - Arguments to update or create a Canvas.
     * @example
     * // Update or create a Canvas
     * const canvas = await prisma.canvas.upsert({
     *   create: {
     *     // ... data to create a Canvas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Canvas we want to update
     *   }
     * })
     */
    upsert<T extends CanvasUpsertArgs>(args: SelectSubset<T, CanvasUpsertArgs<ExtArgs>>): Prisma__CanvasClient<$Result.GetResult<Prisma.$CanvasPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasCountArgs} args - Arguments to filter Canvas to count.
     * @example
     * // Count the number of Canvas
     * const count = await prisma.canvas.count({
     *   where: {
     *     // ... the filter for the Canvas we want to count
     *   }
     * })
    **/
    count<T extends CanvasCountArgs>(
      args?: Subset<T, CanvasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CanvasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CanvasAggregateArgs>(args: Subset<T, CanvasAggregateArgs>): Prisma.PrismaPromise<GetCanvasAggregateType<T>>

    /**
     * Group by Canvas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CanvasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CanvasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CanvasGroupByArgs['orderBy'] }
        : { orderBy?: CanvasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CanvasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCanvasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Canvas model
   */
  readonly fields: CanvasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Canvas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CanvasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends Canvas$connectionArgs<ExtArgs> = {}>(args?: Subset<T, Canvas$connectionArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    owner<T extends Canvas$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Canvas$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Canvas model
   */ 
  interface CanvasFieldRefs {
    readonly id: FieldRef<"Canvas", 'Int'>
    readonly name: FieldRef<"Canvas", 'String'>
    readonly data: FieldRef<"Canvas", 'Json'>
    readonly connectionId: FieldRef<"Canvas", 'Int'>
    readonly createdAt: FieldRef<"Canvas", 'DateTime'>
    readonly updatedAt: FieldRef<"Canvas", 'DateTime'>
    readonly ownerId: FieldRef<"Canvas", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Canvas findUnique
   */
  export type CanvasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas findUniqueOrThrow
   */
  export type CanvasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas findFirst
   */
  export type CanvasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Canvas.
     */
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas findFirstOrThrow
   */
  export type CanvasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Canvas.
     */
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas findMany
   */
  export type CanvasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter, which Canvas to fetch.
     */
    where?: CanvasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Canvas to fetch.
     */
    orderBy?: CanvasOrderByWithRelationInput | CanvasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Canvas.
     */
    cursor?: CanvasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Canvas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Canvas.
     */
    skip?: number
    distinct?: CanvasScalarFieldEnum | CanvasScalarFieldEnum[]
  }

  /**
   * Canvas create
   */
  export type CanvasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * The data needed to create a Canvas.
     */
    data: XOR<CanvasCreateInput, CanvasUncheckedCreateInput>
  }

  /**
   * Canvas createMany
   */
  export type CanvasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Canvas.
     */
    data: CanvasCreateManyInput | CanvasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Canvas createManyAndReturn
   */
  export type CanvasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Canvas.
     */
    data: CanvasCreateManyInput | CanvasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Canvas update
   */
  export type CanvasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * The data needed to update a Canvas.
     */
    data: XOR<CanvasUpdateInput, CanvasUncheckedUpdateInput>
    /**
     * Choose, which Canvas to update.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas updateMany
   */
  export type CanvasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Canvas.
     */
    data: XOR<CanvasUpdateManyMutationInput, CanvasUncheckedUpdateManyInput>
    /**
     * Filter which Canvas to update
     */
    where?: CanvasWhereInput
  }

  /**
   * Canvas upsert
   */
  export type CanvasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * The filter to search for the Canvas to update in case it exists.
     */
    where: CanvasWhereUniqueInput
    /**
     * In case the Canvas found by the `where` argument doesn't exist, create a new Canvas with this data.
     */
    create: XOR<CanvasCreateInput, CanvasUncheckedCreateInput>
    /**
     * In case the Canvas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CanvasUpdateInput, CanvasUncheckedUpdateInput>
  }

  /**
   * Canvas delete
   */
  export type CanvasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
    /**
     * Filter which Canvas to delete.
     */
    where: CanvasWhereUniqueInput
  }

  /**
   * Canvas deleteMany
   */
  export type CanvasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Canvas to delete
     */
    where?: CanvasWhereInput
  }

  /**
   * Canvas.connection
   */
  export type Canvas$connectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
  }

  /**
   * Canvas.owner
   */
  export type Canvas$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Canvas without action
   */
  export type CanvasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Canvas
     */
    select?: CanvasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CanvasInclude<ExtArgs> | null
  }


  /**
   * Model TableRelationship
   */

  export type AggregateTableRelationship = {
    _count: TableRelationshipCountAggregateOutputType | null
    _avg: TableRelationshipAvgAggregateOutputType | null
    _sum: TableRelationshipSumAggregateOutputType | null
    _min: TableRelationshipMinAggregateOutputType | null
    _max: TableRelationshipMaxAggregateOutputType | null
  }

  export type TableRelationshipAvgAggregateOutputType = {
    id: number | null
    confidence: number | null
    connectionId: number | null
    patternRuleId: number | null
    ownerId: number | null
  }

  export type TableRelationshipSumAggregateOutputType = {
    id: number | null
    confidence: number | null
    connectionId: number | null
    patternRuleId: number | null
    ownerId: number | null
  }

  export type TableRelationshipMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    sourceTable: string | null
    sourceColumn: string | null
    targetTable: string | null
    targetColumn: string | null
    relationshipType: $Enums.TableRelationshipType | null
    detectionMethod: $Enums.DetectionMethod | null
    confidence: number | null
    constraintName: string | null
    connectionId: number | null
    isActive: boolean | null
    isCustom: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    patternRuleId: number | null
    ownerId: number | null
  }

  export type TableRelationshipMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    sourceTable: string | null
    sourceColumn: string | null
    targetTable: string | null
    targetColumn: string | null
    relationshipType: $Enums.TableRelationshipType | null
    detectionMethod: $Enums.DetectionMethod | null
    confidence: number | null
    constraintName: string | null
    connectionId: number | null
    isActive: boolean | null
    isCustom: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    patternRuleId: number | null
    ownerId: number | null
  }

  export type TableRelationshipCountAggregateOutputType = {
    id: number
    name: number
    description: number
    sourceTable: number
    sourceColumn: number
    targetTable: number
    targetColumn: number
    relationshipType: number
    detectionMethod: number
    confidence: number
    constraintName: number
    connectionId: number
    isActive: number
    isCustom: number
    createdAt: number
    updatedAt: number
    patternRuleId: number
    ownerId: number
    _all: number
  }


  export type TableRelationshipAvgAggregateInputType = {
    id?: true
    confidence?: true
    connectionId?: true
    patternRuleId?: true
    ownerId?: true
  }

  export type TableRelationshipSumAggregateInputType = {
    id?: true
    confidence?: true
    connectionId?: true
    patternRuleId?: true
    ownerId?: true
  }

  export type TableRelationshipMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourceTable?: true
    sourceColumn?: true
    targetTable?: true
    targetColumn?: true
    relationshipType?: true
    detectionMethod?: true
    confidence?: true
    constraintName?: true
    connectionId?: true
    isActive?: true
    isCustom?: true
    createdAt?: true
    updatedAt?: true
    patternRuleId?: true
    ownerId?: true
  }

  export type TableRelationshipMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourceTable?: true
    sourceColumn?: true
    targetTable?: true
    targetColumn?: true
    relationshipType?: true
    detectionMethod?: true
    confidence?: true
    constraintName?: true
    connectionId?: true
    isActive?: true
    isCustom?: true
    createdAt?: true
    updatedAt?: true
    patternRuleId?: true
    ownerId?: true
  }

  export type TableRelationshipCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourceTable?: true
    sourceColumn?: true
    targetTable?: true
    targetColumn?: true
    relationshipType?: true
    detectionMethod?: true
    confidence?: true
    constraintName?: true
    connectionId?: true
    isActive?: true
    isCustom?: true
    createdAt?: true
    updatedAt?: true
    patternRuleId?: true
    ownerId?: true
    _all?: true
  }

  export type TableRelationshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TableRelationship to aggregate.
     */
    where?: TableRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableRelationships to fetch.
     */
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TableRelationships
    **/
    _count?: true | TableRelationshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TableRelationshipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TableRelationshipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableRelationshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableRelationshipMaxAggregateInputType
  }

  export type GetTableRelationshipAggregateType<T extends TableRelationshipAggregateArgs> = {
        [P in keyof T & keyof AggregateTableRelationship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTableRelationship[P]>
      : GetScalarType<T[P], AggregateTableRelationship[P]>
  }




  export type TableRelationshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableRelationshipWhereInput
    orderBy?: TableRelationshipOrderByWithAggregationInput | TableRelationshipOrderByWithAggregationInput[]
    by: TableRelationshipScalarFieldEnum[] | TableRelationshipScalarFieldEnum
    having?: TableRelationshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableRelationshipCountAggregateInputType | true
    _avg?: TableRelationshipAvgAggregateInputType
    _sum?: TableRelationshipSumAggregateInputType
    _min?: TableRelationshipMinAggregateInputType
    _max?: TableRelationshipMaxAggregateInputType
  }

  export type TableRelationshipGroupByOutputType = {
    id: number
    name: string | null
    description: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence: number | null
    constraintName: string | null
    connectionId: number
    isActive: boolean
    isCustom: boolean
    createdAt: Date
    updatedAt: Date
    patternRuleId: number | null
    ownerId: number | null
    _count: TableRelationshipCountAggregateOutputType | null
    _avg: TableRelationshipAvgAggregateOutputType | null
    _sum: TableRelationshipSumAggregateOutputType | null
    _min: TableRelationshipMinAggregateOutputType | null
    _max: TableRelationshipMaxAggregateOutputType | null
  }

  type GetTableRelationshipGroupByPayload<T extends TableRelationshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableRelationshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableRelationshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableRelationshipGroupByOutputType[P]>
            : GetScalarType<T[P], TableRelationshipGroupByOutputType[P]>
        }
      >
    >


  export type TableRelationshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    sourceTable?: boolean
    sourceColumn?: boolean
    targetTable?: boolean
    targetColumn?: boolean
    relationshipType?: boolean
    detectionMethod?: boolean
    confidence?: boolean
    constraintName?: boolean
    connectionId?: boolean
    isActive?: boolean
    isCustom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patternRuleId?: boolean
    ownerId?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    patternRule?: boolean | TableRelationship$patternRuleArgs<ExtArgs>
    owner?: boolean | TableRelationship$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["tableRelationship"]>

  export type TableRelationshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    sourceTable?: boolean
    sourceColumn?: boolean
    targetTable?: boolean
    targetColumn?: boolean
    relationshipType?: boolean
    detectionMethod?: boolean
    confidence?: boolean
    constraintName?: boolean
    connectionId?: boolean
    isActive?: boolean
    isCustom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patternRuleId?: boolean
    ownerId?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    patternRule?: boolean | TableRelationship$patternRuleArgs<ExtArgs>
    owner?: boolean | TableRelationship$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["tableRelationship"]>

  export type TableRelationshipSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    sourceTable?: boolean
    sourceColumn?: boolean
    targetTable?: boolean
    targetColumn?: boolean
    relationshipType?: boolean
    detectionMethod?: boolean
    confidence?: boolean
    constraintName?: boolean
    connectionId?: boolean
    isActive?: boolean
    isCustom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patternRuleId?: boolean
    ownerId?: boolean
  }

  export type TableRelationshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    patternRule?: boolean | TableRelationship$patternRuleArgs<ExtArgs>
    owner?: boolean | TableRelationship$ownerArgs<ExtArgs>
  }
  export type TableRelationshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    patternRule?: boolean | TableRelationship$patternRuleArgs<ExtArgs>
    owner?: boolean | TableRelationship$ownerArgs<ExtArgs>
  }

  export type $TableRelationshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TableRelationship"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
      patternRule: Prisma.$PatternRulePayload<ExtArgs> | null
      owner: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      description: string | null
      sourceTable: string
      sourceColumn: string
      targetTable: string
      targetColumn: string
      relationshipType: $Enums.TableRelationshipType
      detectionMethod: $Enums.DetectionMethod
      confidence: number | null
      constraintName: string | null
      connectionId: number
      isActive: boolean
      isCustom: boolean
      createdAt: Date
      updatedAt: Date
      patternRuleId: number | null
      ownerId: number | null
    }, ExtArgs["result"]["tableRelationship"]>
    composites: {}
  }

  type TableRelationshipGetPayload<S extends boolean | null | undefined | TableRelationshipDefaultArgs> = $Result.GetResult<Prisma.$TableRelationshipPayload, S>

  type TableRelationshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TableRelationshipFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TableRelationshipCountAggregateInputType | true
    }

  export interface TableRelationshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TableRelationship'], meta: { name: 'TableRelationship' } }
    /**
     * Find zero or one TableRelationship that matches the filter.
     * @param {TableRelationshipFindUniqueArgs} args - Arguments to find a TableRelationship
     * @example
     * // Get one TableRelationship
     * const tableRelationship = await prisma.tableRelationship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableRelationshipFindUniqueArgs>(args: SelectSubset<T, TableRelationshipFindUniqueArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TableRelationship that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TableRelationshipFindUniqueOrThrowArgs} args - Arguments to find a TableRelationship
     * @example
     * // Get one TableRelationship
     * const tableRelationship = await prisma.tableRelationship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableRelationshipFindUniqueOrThrowArgs>(args: SelectSubset<T, TableRelationshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TableRelationship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipFindFirstArgs} args - Arguments to find a TableRelationship
     * @example
     * // Get one TableRelationship
     * const tableRelationship = await prisma.tableRelationship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableRelationshipFindFirstArgs>(args?: SelectSubset<T, TableRelationshipFindFirstArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TableRelationship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipFindFirstOrThrowArgs} args - Arguments to find a TableRelationship
     * @example
     * // Get one TableRelationship
     * const tableRelationship = await prisma.tableRelationship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableRelationshipFindFirstOrThrowArgs>(args?: SelectSubset<T, TableRelationshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TableRelationships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TableRelationships
     * const tableRelationships = await prisma.tableRelationship.findMany()
     * 
     * // Get first 10 TableRelationships
     * const tableRelationships = await prisma.tableRelationship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tableRelationshipWithIdOnly = await prisma.tableRelationship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TableRelationshipFindManyArgs>(args?: SelectSubset<T, TableRelationshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TableRelationship.
     * @param {TableRelationshipCreateArgs} args - Arguments to create a TableRelationship.
     * @example
     * // Create one TableRelationship
     * const TableRelationship = await prisma.tableRelationship.create({
     *   data: {
     *     // ... data to create a TableRelationship
     *   }
     * })
     * 
     */
    create<T extends TableRelationshipCreateArgs>(args: SelectSubset<T, TableRelationshipCreateArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TableRelationships.
     * @param {TableRelationshipCreateManyArgs} args - Arguments to create many TableRelationships.
     * @example
     * // Create many TableRelationships
     * const tableRelationship = await prisma.tableRelationship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TableRelationshipCreateManyArgs>(args?: SelectSubset<T, TableRelationshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TableRelationships and returns the data saved in the database.
     * @param {TableRelationshipCreateManyAndReturnArgs} args - Arguments to create many TableRelationships.
     * @example
     * // Create many TableRelationships
     * const tableRelationship = await prisma.tableRelationship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TableRelationships and only return the `id`
     * const tableRelationshipWithIdOnly = await prisma.tableRelationship.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TableRelationshipCreateManyAndReturnArgs>(args?: SelectSubset<T, TableRelationshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TableRelationship.
     * @param {TableRelationshipDeleteArgs} args - Arguments to delete one TableRelationship.
     * @example
     * // Delete one TableRelationship
     * const TableRelationship = await prisma.tableRelationship.delete({
     *   where: {
     *     // ... filter to delete one TableRelationship
     *   }
     * })
     * 
     */
    delete<T extends TableRelationshipDeleteArgs>(args: SelectSubset<T, TableRelationshipDeleteArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TableRelationship.
     * @param {TableRelationshipUpdateArgs} args - Arguments to update one TableRelationship.
     * @example
     * // Update one TableRelationship
     * const tableRelationship = await prisma.tableRelationship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TableRelationshipUpdateArgs>(args: SelectSubset<T, TableRelationshipUpdateArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TableRelationships.
     * @param {TableRelationshipDeleteManyArgs} args - Arguments to filter TableRelationships to delete.
     * @example
     * // Delete a few TableRelationships
     * const { count } = await prisma.tableRelationship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TableRelationshipDeleteManyArgs>(args?: SelectSubset<T, TableRelationshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TableRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TableRelationships
     * const tableRelationship = await prisma.tableRelationship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TableRelationshipUpdateManyArgs>(args: SelectSubset<T, TableRelationshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TableRelationship.
     * @param {TableRelationshipUpsertArgs} args - Arguments to update or create a TableRelationship.
     * @example
     * // Update or create a TableRelationship
     * const tableRelationship = await prisma.tableRelationship.upsert({
     *   create: {
     *     // ... data to create a TableRelationship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TableRelationship we want to update
     *   }
     * })
     */
    upsert<T extends TableRelationshipUpsertArgs>(args: SelectSubset<T, TableRelationshipUpsertArgs<ExtArgs>>): Prisma__TableRelationshipClient<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TableRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipCountArgs} args - Arguments to filter TableRelationships to count.
     * @example
     * // Count the number of TableRelationships
     * const count = await prisma.tableRelationship.count({
     *   where: {
     *     // ... the filter for the TableRelationships we want to count
     *   }
     * })
    **/
    count<T extends TableRelationshipCountArgs>(
      args?: Subset<T, TableRelationshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableRelationshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TableRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TableRelationshipAggregateArgs>(args: Subset<T, TableRelationshipAggregateArgs>): Prisma.PrismaPromise<GetTableRelationshipAggregateType<T>>

    /**
     * Group by TableRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableRelationshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TableRelationshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableRelationshipGroupByArgs['orderBy'] }
        : { orderBy?: TableRelationshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableRelationshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableRelationshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TableRelationship model
   */
  readonly fields: TableRelationshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TableRelationship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableRelationshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    patternRule<T extends TableRelationship$patternRuleArgs<ExtArgs> = {}>(args?: Subset<T, TableRelationship$patternRuleArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    owner<T extends TableRelationship$ownerArgs<ExtArgs> = {}>(args?: Subset<T, TableRelationship$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TableRelationship model
   */ 
  interface TableRelationshipFieldRefs {
    readonly id: FieldRef<"TableRelationship", 'Int'>
    readonly name: FieldRef<"TableRelationship", 'String'>
    readonly description: FieldRef<"TableRelationship", 'String'>
    readonly sourceTable: FieldRef<"TableRelationship", 'String'>
    readonly sourceColumn: FieldRef<"TableRelationship", 'String'>
    readonly targetTable: FieldRef<"TableRelationship", 'String'>
    readonly targetColumn: FieldRef<"TableRelationship", 'String'>
    readonly relationshipType: FieldRef<"TableRelationship", 'TableRelationshipType'>
    readonly detectionMethod: FieldRef<"TableRelationship", 'DetectionMethod'>
    readonly confidence: FieldRef<"TableRelationship", 'Float'>
    readonly constraintName: FieldRef<"TableRelationship", 'String'>
    readonly connectionId: FieldRef<"TableRelationship", 'Int'>
    readonly isActive: FieldRef<"TableRelationship", 'Boolean'>
    readonly isCustom: FieldRef<"TableRelationship", 'Boolean'>
    readonly createdAt: FieldRef<"TableRelationship", 'DateTime'>
    readonly updatedAt: FieldRef<"TableRelationship", 'DateTime'>
    readonly patternRuleId: FieldRef<"TableRelationship", 'Int'>
    readonly ownerId: FieldRef<"TableRelationship", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TableRelationship findUnique
   */
  export type TableRelationshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which TableRelationship to fetch.
     */
    where: TableRelationshipWhereUniqueInput
  }

  /**
   * TableRelationship findUniqueOrThrow
   */
  export type TableRelationshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which TableRelationship to fetch.
     */
    where: TableRelationshipWhereUniqueInput
  }

  /**
   * TableRelationship findFirst
   */
  export type TableRelationshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which TableRelationship to fetch.
     */
    where?: TableRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableRelationships to fetch.
     */
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TableRelationships.
     */
    cursor?: TableRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TableRelationships.
     */
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * TableRelationship findFirstOrThrow
   */
  export type TableRelationshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which TableRelationship to fetch.
     */
    where?: TableRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableRelationships to fetch.
     */
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TableRelationships.
     */
    cursor?: TableRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TableRelationships.
     */
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * TableRelationship findMany
   */
  export type TableRelationshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which TableRelationships to fetch.
     */
    where?: TableRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TableRelationships to fetch.
     */
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TableRelationships.
     */
    cursor?: TableRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TableRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TableRelationships.
     */
    skip?: number
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * TableRelationship create
   */
  export type TableRelationshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to create a TableRelationship.
     */
    data: XOR<TableRelationshipCreateInput, TableRelationshipUncheckedCreateInput>
  }

  /**
   * TableRelationship createMany
   */
  export type TableRelationshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TableRelationships.
     */
    data: TableRelationshipCreateManyInput | TableRelationshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TableRelationship createManyAndReturn
   */
  export type TableRelationshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TableRelationships.
     */
    data: TableRelationshipCreateManyInput | TableRelationshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TableRelationship update
   */
  export type TableRelationshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to update a TableRelationship.
     */
    data: XOR<TableRelationshipUpdateInput, TableRelationshipUncheckedUpdateInput>
    /**
     * Choose, which TableRelationship to update.
     */
    where: TableRelationshipWhereUniqueInput
  }

  /**
   * TableRelationship updateMany
   */
  export type TableRelationshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TableRelationships.
     */
    data: XOR<TableRelationshipUpdateManyMutationInput, TableRelationshipUncheckedUpdateManyInput>
    /**
     * Filter which TableRelationships to update
     */
    where?: TableRelationshipWhereInput
  }

  /**
   * TableRelationship upsert
   */
  export type TableRelationshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * The filter to search for the TableRelationship to update in case it exists.
     */
    where: TableRelationshipWhereUniqueInput
    /**
     * In case the TableRelationship found by the `where` argument doesn't exist, create a new TableRelationship with this data.
     */
    create: XOR<TableRelationshipCreateInput, TableRelationshipUncheckedCreateInput>
    /**
     * In case the TableRelationship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableRelationshipUpdateInput, TableRelationshipUncheckedUpdateInput>
  }

  /**
   * TableRelationship delete
   */
  export type TableRelationshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    /**
     * Filter which TableRelationship to delete.
     */
    where: TableRelationshipWhereUniqueInput
  }

  /**
   * TableRelationship deleteMany
   */
  export type TableRelationshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TableRelationships to delete
     */
    where?: TableRelationshipWhereInput
  }

  /**
   * TableRelationship.patternRule
   */
  export type TableRelationship$patternRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    where?: PatternRuleWhereInput
  }

  /**
   * TableRelationship.owner
   */
  export type TableRelationship$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TableRelationship without action
   */
  export type TableRelationshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
  }


  /**
   * Model PatternRule
   */

  export type AggregatePatternRule = {
    _count: PatternRuleCountAggregateOutputType | null
    _avg: PatternRuleAvgAggregateOutputType | null
    _sum: PatternRuleSumAggregateOutputType | null
    _min: PatternRuleMinAggregateOutputType | null
    _max: PatternRuleMaxAggregateOutputType | null
  }

  export type PatternRuleAvgAggregateOutputType = {
    id: number | null
    priority: number | null
    minConfidence: number | null
    connectionId: number | null
    ownerId: number | null
  }

  export type PatternRuleSumAggregateOutputType = {
    id: number | null
    priority: number | null
    minConfidence: number | null
    connectionId: number | null
    ownerId: number | null
  }

  export type PatternRuleMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    sourcePattern: string | null
    targetPattern: string | null
    relationshipType: $Enums.TableRelationshipType | null
    priority: number | null
    isEnabled: boolean | null
    minConfidence: number | null
    connectionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type PatternRuleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    sourcePattern: string | null
    targetPattern: string | null
    relationshipType: $Enums.TableRelationshipType | null
    priority: number | null
    isEnabled: boolean | null
    minConfidence: number | null
    connectionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: number | null
  }

  export type PatternRuleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    sourcePattern: number
    targetPattern: number
    relationshipType: number
    priority: number
    isEnabled: number
    minConfidence: number
    connectionId: number
    createdAt: number
    updatedAt: number
    ownerId: number
    _all: number
  }


  export type PatternRuleAvgAggregateInputType = {
    id?: true
    priority?: true
    minConfidence?: true
    connectionId?: true
    ownerId?: true
  }

  export type PatternRuleSumAggregateInputType = {
    id?: true
    priority?: true
    minConfidence?: true
    connectionId?: true
    ownerId?: true
  }

  export type PatternRuleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourcePattern?: true
    targetPattern?: true
    relationshipType?: true
    priority?: true
    isEnabled?: true
    minConfidence?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type PatternRuleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourcePattern?: true
    targetPattern?: true
    relationshipType?: true
    priority?: true
    isEnabled?: true
    minConfidence?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type PatternRuleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    sourcePattern?: true
    targetPattern?: true
    relationshipType?: true
    priority?: true
    isEnabled?: true
    minConfidence?: true
    connectionId?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    _all?: true
  }

  export type PatternRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatternRule to aggregate.
     */
    where?: PatternRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatternRules to fetch.
     */
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatternRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatternRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatternRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatternRules
    **/
    _count?: true | PatternRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatternRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatternRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatternRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatternRuleMaxAggregateInputType
  }

  export type GetPatternRuleAggregateType<T extends PatternRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePatternRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatternRule[P]>
      : GetScalarType<T[P], AggregatePatternRule[P]>
  }




  export type PatternRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatternRuleWhereInput
    orderBy?: PatternRuleOrderByWithAggregationInput | PatternRuleOrderByWithAggregationInput[]
    by: PatternRuleScalarFieldEnum[] | PatternRuleScalarFieldEnum
    having?: PatternRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatternRuleCountAggregateInputType | true
    _avg?: PatternRuleAvgAggregateInputType
    _sum?: PatternRuleSumAggregateInputType
    _min?: PatternRuleMinAggregateInputType
    _max?: PatternRuleMaxAggregateInputType
  }

  export type PatternRuleGroupByOutputType = {
    id: number
    name: string
    description: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority: number
    isEnabled: boolean
    minConfidence: number | null
    connectionId: number | null
    createdAt: Date
    updatedAt: Date
    ownerId: number | null
    _count: PatternRuleCountAggregateOutputType | null
    _avg: PatternRuleAvgAggregateOutputType | null
    _sum: PatternRuleSumAggregateOutputType | null
    _min: PatternRuleMinAggregateOutputType | null
    _max: PatternRuleMaxAggregateOutputType | null
  }

  type GetPatternRuleGroupByPayload<T extends PatternRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatternRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatternRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatternRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PatternRuleGroupByOutputType[P]>
        }
      >
    >


  export type PatternRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    sourcePattern?: boolean
    targetPattern?: boolean
    relationshipType?: boolean
    priority?: boolean
    isEnabled?: boolean
    minConfidence?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    connection?: boolean | PatternRule$connectionArgs<ExtArgs>
    tableRelationships?: boolean | PatternRule$tableRelationshipsArgs<ExtArgs>
    owner?: boolean | PatternRule$ownerArgs<ExtArgs>
    _count?: boolean | PatternRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patternRule"]>

  export type PatternRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    sourcePattern?: boolean
    targetPattern?: boolean
    relationshipType?: boolean
    priority?: boolean
    isEnabled?: boolean
    minConfidence?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    connection?: boolean | PatternRule$connectionArgs<ExtArgs>
    owner?: boolean | PatternRule$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["patternRule"]>

  export type PatternRuleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    sourcePattern?: boolean
    targetPattern?: boolean
    relationshipType?: boolean
    priority?: boolean
    isEnabled?: boolean
    minConfidence?: boolean
    connectionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
  }

  export type PatternRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | PatternRule$connectionArgs<ExtArgs>
    tableRelationships?: boolean | PatternRule$tableRelationshipsArgs<ExtArgs>
    owner?: boolean | PatternRule$ownerArgs<ExtArgs>
    _count?: boolean | PatternRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatternRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | PatternRule$connectionArgs<ExtArgs>
    owner?: boolean | PatternRule$ownerArgs<ExtArgs>
  }

  export type $PatternRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatternRule"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs> | null
      tableRelationships: Prisma.$TableRelationshipPayload<ExtArgs>[]
      owner: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      sourcePattern: string
      targetPattern: string
      relationshipType: $Enums.TableRelationshipType
      priority: number
      isEnabled: boolean
      minConfidence: number | null
      connectionId: number | null
      createdAt: Date
      updatedAt: Date
      ownerId: number | null
    }, ExtArgs["result"]["patternRule"]>
    composites: {}
  }

  type PatternRuleGetPayload<S extends boolean | null | undefined | PatternRuleDefaultArgs> = $Result.GetResult<Prisma.$PatternRulePayload, S>

  type PatternRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatternRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatternRuleCountAggregateInputType | true
    }

  export interface PatternRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatternRule'], meta: { name: 'PatternRule' } }
    /**
     * Find zero or one PatternRule that matches the filter.
     * @param {PatternRuleFindUniqueArgs} args - Arguments to find a PatternRule
     * @example
     * // Get one PatternRule
     * const patternRule = await prisma.patternRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatternRuleFindUniqueArgs>(args: SelectSubset<T, PatternRuleFindUniqueArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PatternRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatternRuleFindUniqueOrThrowArgs} args - Arguments to find a PatternRule
     * @example
     * // Get one PatternRule
     * const patternRule = await prisma.patternRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatternRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PatternRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PatternRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleFindFirstArgs} args - Arguments to find a PatternRule
     * @example
     * // Get one PatternRule
     * const patternRule = await prisma.patternRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatternRuleFindFirstArgs>(args?: SelectSubset<T, PatternRuleFindFirstArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PatternRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleFindFirstOrThrowArgs} args - Arguments to find a PatternRule
     * @example
     * // Get one PatternRule
     * const patternRule = await prisma.patternRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatternRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PatternRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PatternRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatternRules
     * const patternRules = await prisma.patternRule.findMany()
     * 
     * // Get first 10 PatternRules
     * const patternRules = await prisma.patternRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patternRuleWithIdOnly = await prisma.patternRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatternRuleFindManyArgs>(args?: SelectSubset<T, PatternRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PatternRule.
     * @param {PatternRuleCreateArgs} args - Arguments to create a PatternRule.
     * @example
     * // Create one PatternRule
     * const PatternRule = await prisma.patternRule.create({
     *   data: {
     *     // ... data to create a PatternRule
     *   }
     * })
     * 
     */
    create<T extends PatternRuleCreateArgs>(args: SelectSubset<T, PatternRuleCreateArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PatternRules.
     * @param {PatternRuleCreateManyArgs} args - Arguments to create many PatternRules.
     * @example
     * // Create many PatternRules
     * const patternRule = await prisma.patternRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatternRuleCreateManyArgs>(args?: SelectSubset<T, PatternRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatternRules and returns the data saved in the database.
     * @param {PatternRuleCreateManyAndReturnArgs} args - Arguments to create many PatternRules.
     * @example
     * // Create many PatternRules
     * const patternRule = await prisma.patternRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatternRules and only return the `id`
     * const patternRuleWithIdOnly = await prisma.patternRule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatternRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PatternRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PatternRule.
     * @param {PatternRuleDeleteArgs} args - Arguments to delete one PatternRule.
     * @example
     * // Delete one PatternRule
     * const PatternRule = await prisma.patternRule.delete({
     *   where: {
     *     // ... filter to delete one PatternRule
     *   }
     * })
     * 
     */
    delete<T extends PatternRuleDeleteArgs>(args: SelectSubset<T, PatternRuleDeleteArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PatternRule.
     * @param {PatternRuleUpdateArgs} args - Arguments to update one PatternRule.
     * @example
     * // Update one PatternRule
     * const patternRule = await prisma.patternRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatternRuleUpdateArgs>(args: SelectSubset<T, PatternRuleUpdateArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PatternRules.
     * @param {PatternRuleDeleteManyArgs} args - Arguments to filter PatternRules to delete.
     * @example
     * // Delete a few PatternRules
     * const { count } = await prisma.patternRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatternRuleDeleteManyArgs>(args?: SelectSubset<T, PatternRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatternRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatternRules
     * const patternRule = await prisma.patternRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatternRuleUpdateManyArgs>(args: SelectSubset<T, PatternRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PatternRule.
     * @param {PatternRuleUpsertArgs} args - Arguments to update or create a PatternRule.
     * @example
     * // Update or create a PatternRule
     * const patternRule = await prisma.patternRule.upsert({
     *   create: {
     *     // ... data to create a PatternRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatternRule we want to update
     *   }
     * })
     */
    upsert<T extends PatternRuleUpsertArgs>(args: SelectSubset<T, PatternRuleUpsertArgs<ExtArgs>>): Prisma__PatternRuleClient<$Result.GetResult<Prisma.$PatternRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PatternRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleCountArgs} args - Arguments to filter PatternRules to count.
     * @example
     * // Count the number of PatternRules
     * const count = await prisma.patternRule.count({
     *   where: {
     *     // ... the filter for the PatternRules we want to count
     *   }
     * })
    **/
    count<T extends PatternRuleCountArgs>(
      args?: Subset<T, PatternRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatternRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatternRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatternRuleAggregateArgs>(args: Subset<T, PatternRuleAggregateArgs>): Prisma.PrismaPromise<GetPatternRuleAggregateType<T>>

    /**
     * Group by PatternRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatternRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatternRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatternRuleGroupByArgs['orderBy'] }
        : { orderBy?: PatternRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatternRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatternRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatternRule model
   */
  readonly fields: PatternRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatternRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatternRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends PatternRule$connectionArgs<ExtArgs> = {}>(args?: Subset<T, PatternRule$connectionArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tableRelationships<T extends PatternRule$tableRelationshipsArgs<ExtArgs> = {}>(args?: Subset<T, PatternRule$tableRelationshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TableRelationshipPayload<ExtArgs>, T, "findMany"> | Null>
    owner<T extends PatternRule$ownerArgs<ExtArgs> = {}>(args?: Subset<T, PatternRule$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatternRule model
   */ 
  interface PatternRuleFieldRefs {
    readonly id: FieldRef<"PatternRule", 'Int'>
    readonly name: FieldRef<"PatternRule", 'String'>
    readonly description: FieldRef<"PatternRule", 'String'>
    readonly sourcePattern: FieldRef<"PatternRule", 'String'>
    readonly targetPattern: FieldRef<"PatternRule", 'String'>
    readonly relationshipType: FieldRef<"PatternRule", 'TableRelationshipType'>
    readonly priority: FieldRef<"PatternRule", 'Int'>
    readonly isEnabled: FieldRef<"PatternRule", 'Boolean'>
    readonly minConfidence: FieldRef<"PatternRule", 'Float'>
    readonly connectionId: FieldRef<"PatternRule", 'Int'>
    readonly createdAt: FieldRef<"PatternRule", 'DateTime'>
    readonly updatedAt: FieldRef<"PatternRule", 'DateTime'>
    readonly ownerId: FieldRef<"PatternRule", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PatternRule findUnique
   */
  export type PatternRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter, which PatternRule to fetch.
     */
    where: PatternRuleWhereUniqueInput
  }

  /**
   * PatternRule findUniqueOrThrow
   */
  export type PatternRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter, which PatternRule to fetch.
     */
    where: PatternRuleWhereUniqueInput
  }

  /**
   * PatternRule findFirst
   */
  export type PatternRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter, which PatternRule to fetch.
     */
    where?: PatternRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatternRules to fetch.
     */
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatternRules.
     */
    cursor?: PatternRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatternRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatternRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatternRules.
     */
    distinct?: PatternRuleScalarFieldEnum | PatternRuleScalarFieldEnum[]
  }

  /**
   * PatternRule findFirstOrThrow
   */
  export type PatternRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter, which PatternRule to fetch.
     */
    where?: PatternRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatternRules to fetch.
     */
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatternRules.
     */
    cursor?: PatternRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatternRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatternRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatternRules.
     */
    distinct?: PatternRuleScalarFieldEnum | PatternRuleScalarFieldEnum[]
  }

  /**
   * PatternRule findMany
   */
  export type PatternRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter, which PatternRules to fetch.
     */
    where?: PatternRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatternRules to fetch.
     */
    orderBy?: PatternRuleOrderByWithRelationInput | PatternRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatternRules.
     */
    cursor?: PatternRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatternRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatternRules.
     */
    skip?: number
    distinct?: PatternRuleScalarFieldEnum | PatternRuleScalarFieldEnum[]
  }

  /**
   * PatternRule create
   */
  export type PatternRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PatternRule.
     */
    data: XOR<PatternRuleCreateInput, PatternRuleUncheckedCreateInput>
  }

  /**
   * PatternRule createMany
   */
  export type PatternRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatternRules.
     */
    data: PatternRuleCreateManyInput | PatternRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatternRule createManyAndReturn
   */
  export type PatternRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PatternRules.
     */
    data: PatternRuleCreateManyInput | PatternRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatternRule update
   */
  export type PatternRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PatternRule.
     */
    data: XOR<PatternRuleUpdateInput, PatternRuleUncheckedUpdateInput>
    /**
     * Choose, which PatternRule to update.
     */
    where: PatternRuleWhereUniqueInput
  }

  /**
   * PatternRule updateMany
   */
  export type PatternRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatternRules.
     */
    data: XOR<PatternRuleUpdateManyMutationInput, PatternRuleUncheckedUpdateManyInput>
    /**
     * Filter which PatternRules to update
     */
    where?: PatternRuleWhereInput
  }

  /**
   * PatternRule upsert
   */
  export type PatternRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PatternRule to update in case it exists.
     */
    where: PatternRuleWhereUniqueInput
    /**
     * In case the PatternRule found by the `where` argument doesn't exist, create a new PatternRule with this data.
     */
    create: XOR<PatternRuleCreateInput, PatternRuleUncheckedCreateInput>
    /**
     * In case the PatternRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatternRuleUpdateInput, PatternRuleUncheckedUpdateInput>
  }

  /**
   * PatternRule delete
   */
  export type PatternRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
    /**
     * Filter which PatternRule to delete.
     */
    where: PatternRuleWhereUniqueInput
  }

  /**
   * PatternRule deleteMany
   */
  export type PatternRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatternRules to delete
     */
    where?: PatternRuleWhereInput
  }

  /**
   * PatternRule.connection
   */
  export type PatternRule$connectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
  }

  /**
   * PatternRule.tableRelationships
   */
  export type PatternRule$tableRelationshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableRelationship
     */
    select?: TableRelationshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableRelationshipInclude<ExtArgs> | null
    where?: TableRelationshipWhereInput
    orderBy?: TableRelationshipOrderByWithRelationInput | TableRelationshipOrderByWithRelationInput[]
    cursor?: TableRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableRelationshipScalarFieldEnum | TableRelationshipScalarFieldEnum[]
  }

  /**
   * PatternRule.owner
   */
  export type PatternRule$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PatternRule without action
   */
  export type PatternRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatternRule
     */
    select?: PatternRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatternRuleInclude<ExtArgs> | null
  }


  /**
   * Model DeepQuery
   */

  export type AggregateDeepQuery = {
    _count: DeepQueryCountAggregateOutputType | null
    _avg: DeepQueryAvgAggregateOutputType | null
    _sum: DeepQuerySumAggregateOutputType | null
    _min: DeepQueryMinAggregateOutputType | null
    _max: DeepQueryMaxAggregateOutputType | null
  }

  export type DeepQueryAvgAggregateOutputType = {
    id: number | null
    maxDepth: number | null
    connectionId: number | null
    cacheDuration: number | null
    executionTime: number | null
    ownerId: number | null
  }

  export type DeepQuerySumAggregateOutputType = {
    id: number | null
    maxDepth: number | null
    connectionId: number | null
    cacheDuration: number | null
    executionTime: number | null
    ownerId: number | null
  }

  export type DeepQueryMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    startTable: string | null
    maxDepth: number | null
    connectionId: number | null
    useCache: boolean | null
    cacheDuration: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastExecutedAt: Date | null
    executionTime: number | null
    ownerId: number | null
  }

  export type DeepQueryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    startTable: string | null
    maxDepth: number | null
    connectionId: number | null
    useCache: boolean | null
    cacheDuration: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastExecutedAt: Date | null
    executionTime: number | null
    ownerId: number | null
  }

  export type DeepQueryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    startTable: number
    startCondition: number
    maxDepth: number
    includeFields: number
    excludeFields: number
    connectionId: number
    useCache: number
    cacheDuration: number
    isActive: number
    createdAt: number
    updatedAt: number
    lastResult: number
    lastExecutedAt: number
    executionTime: number
    ownerId: number
    _all: number
  }


  export type DeepQueryAvgAggregateInputType = {
    id?: true
    maxDepth?: true
    connectionId?: true
    cacheDuration?: true
    executionTime?: true
    ownerId?: true
  }

  export type DeepQuerySumAggregateInputType = {
    id?: true
    maxDepth?: true
    connectionId?: true
    cacheDuration?: true
    executionTime?: true
    ownerId?: true
  }

  export type DeepQueryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startTable?: true
    maxDepth?: true
    connectionId?: true
    useCache?: true
    cacheDuration?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    lastExecutedAt?: true
    executionTime?: true
    ownerId?: true
  }

  export type DeepQueryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startTable?: true
    maxDepth?: true
    connectionId?: true
    useCache?: true
    cacheDuration?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    lastExecutedAt?: true
    executionTime?: true
    ownerId?: true
  }

  export type DeepQueryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startTable?: true
    startCondition?: true
    maxDepth?: true
    includeFields?: true
    excludeFields?: true
    connectionId?: true
    useCache?: true
    cacheDuration?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    lastResult?: true
    lastExecutedAt?: true
    executionTime?: true
    ownerId?: true
    _all?: true
  }

  export type DeepQueryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeepQuery to aggregate.
     */
    where?: DeepQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeepQueries to fetch.
     */
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeepQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeepQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeepQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeepQueries
    **/
    _count?: true | DeepQueryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeepQueryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeepQuerySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeepQueryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeepQueryMaxAggregateInputType
  }

  export type GetDeepQueryAggregateType<T extends DeepQueryAggregateArgs> = {
        [P in keyof T & keyof AggregateDeepQuery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeepQuery[P]>
      : GetScalarType<T[P], AggregateDeepQuery[P]>
  }




  export type DeepQueryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeepQueryWhereInput
    orderBy?: DeepQueryOrderByWithAggregationInput | DeepQueryOrderByWithAggregationInput[]
    by: DeepQueryScalarFieldEnum[] | DeepQueryScalarFieldEnum
    having?: DeepQueryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeepQueryCountAggregateInputType | true
    _avg?: DeepQueryAvgAggregateInputType
    _sum?: DeepQuerySumAggregateInputType
    _min?: DeepQueryMinAggregateInputType
    _max?: DeepQueryMaxAggregateInputType
  }

  export type DeepQueryGroupByOutputType = {
    id: number
    name: string
    description: string | null
    startTable: string
    startCondition: JsonValue | null
    maxDepth: number
    includeFields: JsonValue | null
    excludeFields: JsonValue | null
    connectionId: number
    useCache: boolean
    cacheDuration: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    lastResult: JsonValue | null
    lastExecutedAt: Date | null
    executionTime: number | null
    ownerId: number | null
    _count: DeepQueryCountAggregateOutputType | null
    _avg: DeepQueryAvgAggregateOutputType | null
    _sum: DeepQuerySumAggregateOutputType | null
    _min: DeepQueryMinAggregateOutputType | null
    _max: DeepQueryMaxAggregateOutputType | null
  }

  type GetDeepQueryGroupByPayload<T extends DeepQueryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeepQueryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeepQueryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeepQueryGroupByOutputType[P]>
            : GetScalarType<T[P], DeepQueryGroupByOutputType[P]>
        }
      >
    >


  export type DeepQuerySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startTable?: boolean
    startCondition?: boolean
    maxDepth?: boolean
    includeFields?: boolean
    excludeFields?: boolean
    connectionId?: boolean
    useCache?: boolean
    cacheDuration?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastResult?: boolean
    lastExecutedAt?: boolean
    executionTime?: boolean
    ownerId?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    owner?: boolean | DeepQuery$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["deepQuery"]>

  export type DeepQuerySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startTable?: boolean
    startCondition?: boolean
    maxDepth?: boolean
    includeFields?: boolean
    excludeFields?: boolean
    connectionId?: boolean
    useCache?: boolean
    cacheDuration?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastResult?: boolean
    lastExecutedAt?: boolean
    executionTime?: boolean
    ownerId?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    owner?: boolean | DeepQuery$ownerArgs<ExtArgs>
  }, ExtArgs["result"]["deepQuery"]>

  export type DeepQuerySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    startTable?: boolean
    startCondition?: boolean
    maxDepth?: boolean
    includeFields?: boolean
    excludeFields?: boolean
    connectionId?: boolean
    useCache?: boolean
    cacheDuration?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastResult?: boolean
    lastExecutedAt?: boolean
    executionTime?: boolean
    ownerId?: boolean
  }

  export type DeepQueryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    owner?: boolean | DeepQuery$ownerArgs<ExtArgs>
  }
  export type DeepQueryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    owner?: boolean | DeepQuery$ownerArgs<ExtArgs>
  }

  export type $DeepQueryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeepQuery"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
      owner: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      startTable: string
      startCondition: Prisma.JsonValue | null
      maxDepth: number
      includeFields: Prisma.JsonValue | null
      excludeFields: Prisma.JsonValue | null
      connectionId: number
      useCache: boolean
      cacheDuration: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      lastResult: Prisma.JsonValue | null
      lastExecutedAt: Date | null
      executionTime: number | null
      ownerId: number | null
    }, ExtArgs["result"]["deepQuery"]>
    composites: {}
  }

  type DeepQueryGetPayload<S extends boolean | null | undefined | DeepQueryDefaultArgs> = $Result.GetResult<Prisma.$DeepQueryPayload, S>

  type DeepQueryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeepQueryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeepQueryCountAggregateInputType | true
    }

  export interface DeepQueryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeepQuery'], meta: { name: 'DeepQuery' } }
    /**
     * Find zero or one DeepQuery that matches the filter.
     * @param {DeepQueryFindUniqueArgs} args - Arguments to find a DeepQuery
     * @example
     * // Get one DeepQuery
     * const deepQuery = await prisma.deepQuery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeepQueryFindUniqueArgs>(args: SelectSubset<T, DeepQueryFindUniqueArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DeepQuery that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeepQueryFindUniqueOrThrowArgs} args - Arguments to find a DeepQuery
     * @example
     * // Get one DeepQuery
     * const deepQuery = await prisma.deepQuery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeepQueryFindUniqueOrThrowArgs>(args: SelectSubset<T, DeepQueryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DeepQuery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryFindFirstArgs} args - Arguments to find a DeepQuery
     * @example
     * // Get one DeepQuery
     * const deepQuery = await prisma.deepQuery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeepQueryFindFirstArgs>(args?: SelectSubset<T, DeepQueryFindFirstArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DeepQuery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryFindFirstOrThrowArgs} args - Arguments to find a DeepQuery
     * @example
     * // Get one DeepQuery
     * const deepQuery = await prisma.deepQuery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeepQueryFindFirstOrThrowArgs>(args?: SelectSubset<T, DeepQueryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DeepQueries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeepQueries
     * const deepQueries = await prisma.deepQuery.findMany()
     * 
     * // Get first 10 DeepQueries
     * const deepQueries = await prisma.deepQuery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deepQueryWithIdOnly = await prisma.deepQuery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeepQueryFindManyArgs>(args?: SelectSubset<T, DeepQueryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DeepQuery.
     * @param {DeepQueryCreateArgs} args - Arguments to create a DeepQuery.
     * @example
     * // Create one DeepQuery
     * const DeepQuery = await prisma.deepQuery.create({
     *   data: {
     *     // ... data to create a DeepQuery
     *   }
     * })
     * 
     */
    create<T extends DeepQueryCreateArgs>(args: SelectSubset<T, DeepQueryCreateArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DeepQueries.
     * @param {DeepQueryCreateManyArgs} args - Arguments to create many DeepQueries.
     * @example
     * // Create many DeepQueries
     * const deepQuery = await prisma.deepQuery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeepQueryCreateManyArgs>(args?: SelectSubset<T, DeepQueryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeepQueries and returns the data saved in the database.
     * @param {DeepQueryCreateManyAndReturnArgs} args - Arguments to create many DeepQueries.
     * @example
     * // Create many DeepQueries
     * const deepQuery = await prisma.deepQuery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeepQueries and only return the `id`
     * const deepQueryWithIdOnly = await prisma.deepQuery.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeepQueryCreateManyAndReturnArgs>(args?: SelectSubset<T, DeepQueryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DeepQuery.
     * @param {DeepQueryDeleteArgs} args - Arguments to delete one DeepQuery.
     * @example
     * // Delete one DeepQuery
     * const DeepQuery = await prisma.deepQuery.delete({
     *   where: {
     *     // ... filter to delete one DeepQuery
     *   }
     * })
     * 
     */
    delete<T extends DeepQueryDeleteArgs>(args: SelectSubset<T, DeepQueryDeleteArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DeepQuery.
     * @param {DeepQueryUpdateArgs} args - Arguments to update one DeepQuery.
     * @example
     * // Update one DeepQuery
     * const deepQuery = await prisma.deepQuery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeepQueryUpdateArgs>(args: SelectSubset<T, DeepQueryUpdateArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DeepQueries.
     * @param {DeepQueryDeleteManyArgs} args - Arguments to filter DeepQueries to delete.
     * @example
     * // Delete a few DeepQueries
     * const { count } = await prisma.deepQuery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeepQueryDeleteManyArgs>(args?: SelectSubset<T, DeepQueryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeepQueries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeepQueries
     * const deepQuery = await prisma.deepQuery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeepQueryUpdateManyArgs>(args: SelectSubset<T, DeepQueryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeepQuery.
     * @param {DeepQueryUpsertArgs} args - Arguments to update or create a DeepQuery.
     * @example
     * // Update or create a DeepQuery
     * const deepQuery = await prisma.deepQuery.upsert({
     *   create: {
     *     // ... data to create a DeepQuery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeepQuery we want to update
     *   }
     * })
     */
    upsert<T extends DeepQueryUpsertArgs>(args: SelectSubset<T, DeepQueryUpsertArgs<ExtArgs>>): Prisma__DeepQueryClient<$Result.GetResult<Prisma.$DeepQueryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DeepQueries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryCountArgs} args - Arguments to filter DeepQueries to count.
     * @example
     * // Count the number of DeepQueries
     * const count = await prisma.deepQuery.count({
     *   where: {
     *     // ... the filter for the DeepQueries we want to count
     *   }
     * })
    **/
    count<T extends DeepQueryCountArgs>(
      args?: Subset<T, DeepQueryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeepQueryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeepQuery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeepQueryAggregateArgs>(args: Subset<T, DeepQueryAggregateArgs>): Prisma.PrismaPromise<GetDeepQueryAggregateType<T>>

    /**
     * Group by DeepQuery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeepQueryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeepQueryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeepQueryGroupByArgs['orderBy'] }
        : { orderBy?: DeepQueryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeepQueryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeepQueryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeepQuery model
   */
  readonly fields: DeepQueryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeepQuery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeepQueryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    owner<T extends DeepQuery$ownerArgs<ExtArgs> = {}>(args?: Subset<T, DeepQuery$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeepQuery model
   */ 
  interface DeepQueryFieldRefs {
    readonly id: FieldRef<"DeepQuery", 'Int'>
    readonly name: FieldRef<"DeepQuery", 'String'>
    readonly description: FieldRef<"DeepQuery", 'String'>
    readonly startTable: FieldRef<"DeepQuery", 'String'>
    readonly startCondition: FieldRef<"DeepQuery", 'Json'>
    readonly maxDepth: FieldRef<"DeepQuery", 'Int'>
    readonly includeFields: FieldRef<"DeepQuery", 'Json'>
    readonly excludeFields: FieldRef<"DeepQuery", 'Json'>
    readonly connectionId: FieldRef<"DeepQuery", 'Int'>
    readonly useCache: FieldRef<"DeepQuery", 'Boolean'>
    readonly cacheDuration: FieldRef<"DeepQuery", 'Int'>
    readonly isActive: FieldRef<"DeepQuery", 'Boolean'>
    readonly createdAt: FieldRef<"DeepQuery", 'DateTime'>
    readonly updatedAt: FieldRef<"DeepQuery", 'DateTime'>
    readonly lastResult: FieldRef<"DeepQuery", 'Json'>
    readonly lastExecutedAt: FieldRef<"DeepQuery", 'DateTime'>
    readonly executionTime: FieldRef<"DeepQuery", 'Int'>
    readonly ownerId: FieldRef<"DeepQuery", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DeepQuery findUnique
   */
  export type DeepQueryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter, which DeepQuery to fetch.
     */
    where: DeepQueryWhereUniqueInput
  }

  /**
   * DeepQuery findUniqueOrThrow
   */
  export type DeepQueryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter, which DeepQuery to fetch.
     */
    where: DeepQueryWhereUniqueInput
  }

  /**
   * DeepQuery findFirst
   */
  export type DeepQueryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter, which DeepQuery to fetch.
     */
    where?: DeepQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeepQueries to fetch.
     */
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeepQueries.
     */
    cursor?: DeepQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeepQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeepQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeepQueries.
     */
    distinct?: DeepQueryScalarFieldEnum | DeepQueryScalarFieldEnum[]
  }

  /**
   * DeepQuery findFirstOrThrow
   */
  export type DeepQueryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter, which DeepQuery to fetch.
     */
    where?: DeepQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeepQueries to fetch.
     */
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeepQueries.
     */
    cursor?: DeepQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeepQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeepQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeepQueries.
     */
    distinct?: DeepQueryScalarFieldEnum | DeepQueryScalarFieldEnum[]
  }

  /**
   * DeepQuery findMany
   */
  export type DeepQueryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter, which DeepQueries to fetch.
     */
    where?: DeepQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeepQueries to fetch.
     */
    orderBy?: DeepQueryOrderByWithRelationInput | DeepQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeepQueries.
     */
    cursor?: DeepQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeepQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeepQueries.
     */
    skip?: number
    distinct?: DeepQueryScalarFieldEnum | DeepQueryScalarFieldEnum[]
  }

  /**
   * DeepQuery create
   */
  export type DeepQueryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * The data needed to create a DeepQuery.
     */
    data: XOR<DeepQueryCreateInput, DeepQueryUncheckedCreateInput>
  }

  /**
   * DeepQuery createMany
   */
  export type DeepQueryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeepQueries.
     */
    data: DeepQueryCreateManyInput | DeepQueryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeepQuery createManyAndReturn
   */
  export type DeepQueryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DeepQueries.
     */
    data: DeepQueryCreateManyInput | DeepQueryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeepQuery update
   */
  export type DeepQueryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * The data needed to update a DeepQuery.
     */
    data: XOR<DeepQueryUpdateInput, DeepQueryUncheckedUpdateInput>
    /**
     * Choose, which DeepQuery to update.
     */
    where: DeepQueryWhereUniqueInput
  }

  /**
   * DeepQuery updateMany
   */
  export type DeepQueryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeepQueries.
     */
    data: XOR<DeepQueryUpdateManyMutationInput, DeepQueryUncheckedUpdateManyInput>
    /**
     * Filter which DeepQueries to update
     */
    where?: DeepQueryWhereInput
  }

  /**
   * DeepQuery upsert
   */
  export type DeepQueryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * The filter to search for the DeepQuery to update in case it exists.
     */
    where: DeepQueryWhereUniqueInput
    /**
     * In case the DeepQuery found by the `where` argument doesn't exist, create a new DeepQuery with this data.
     */
    create: XOR<DeepQueryCreateInput, DeepQueryUncheckedCreateInput>
    /**
     * In case the DeepQuery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeepQueryUpdateInput, DeepQueryUncheckedUpdateInput>
  }

  /**
   * DeepQuery delete
   */
  export type DeepQueryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
    /**
     * Filter which DeepQuery to delete.
     */
    where: DeepQueryWhereUniqueInput
  }

  /**
   * DeepQuery deleteMany
   */
  export type DeepQueryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeepQueries to delete
     */
    where?: DeepQueryWhereInput
  }

  /**
   * DeepQuery.owner
   */
  export type DeepQuery$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * DeepQuery without action
   */
  export type DeepQueryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeepQuery
     */
    select?: DeepQuerySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeepQueryInclude<ExtArgs> | null
  }


  /**
   * Model QueryCache
   */

  export type AggregateQueryCache = {
    _count: QueryCacheCountAggregateOutputType | null
    _avg: QueryCacheAvgAggregateOutputType | null
    _sum: QueryCacheSumAggregateOutputType | null
    _min: QueryCacheMinAggregateOutputType | null
    _max: QueryCacheMaxAggregateOutputType | null
  }

  export type QueryCacheAvgAggregateOutputType = {
    id: number | null
    connectionId: number | null
  }

  export type QueryCacheSumAggregateOutputType = {
    id: number | null
    connectionId: number | null
  }

  export type QueryCacheMinAggregateOutputType = {
    id: number | null
    queryHash: string | null
    connectionId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type QueryCacheMaxAggregateOutputType = {
    id: number | null
    queryHash: string | null
    connectionId: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type QueryCacheCountAggregateOutputType = {
    id: number
    queryHash: number
    queryData: number
    result: number
    connectionId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type QueryCacheAvgAggregateInputType = {
    id?: true
    connectionId?: true
  }

  export type QueryCacheSumAggregateInputType = {
    id?: true
    connectionId?: true
  }

  export type QueryCacheMinAggregateInputType = {
    id?: true
    queryHash?: true
    connectionId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type QueryCacheMaxAggregateInputType = {
    id?: true
    queryHash?: true
    connectionId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type QueryCacheCountAggregateInputType = {
    id?: true
    queryHash?: true
    queryData?: true
    result?: true
    connectionId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type QueryCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryCache to aggregate.
     */
    where?: QueryCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryCaches to fetch.
     */
    orderBy?: QueryCacheOrderByWithRelationInput | QueryCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueryCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueryCaches
    **/
    _count?: true | QueryCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueryCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueryCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueryCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueryCacheMaxAggregateInputType
  }

  export type GetQueryCacheAggregateType<T extends QueryCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateQueryCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueryCache[P]>
      : GetScalarType<T[P], AggregateQueryCache[P]>
  }




  export type QueryCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueryCacheWhereInput
    orderBy?: QueryCacheOrderByWithAggregationInput | QueryCacheOrderByWithAggregationInput[]
    by: QueryCacheScalarFieldEnum[] | QueryCacheScalarFieldEnum
    having?: QueryCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueryCacheCountAggregateInputType | true
    _avg?: QueryCacheAvgAggregateInputType
    _sum?: QueryCacheSumAggregateInputType
    _min?: QueryCacheMinAggregateInputType
    _max?: QueryCacheMaxAggregateInputType
  }

  export type QueryCacheGroupByOutputType = {
    id: number
    queryHash: string
    queryData: JsonValue
    result: JsonValue
    connectionId: number
    expiresAt: Date
    createdAt: Date
    _count: QueryCacheCountAggregateOutputType | null
    _avg: QueryCacheAvgAggregateOutputType | null
    _sum: QueryCacheSumAggregateOutputType | null
    _min: QueryCacheMinAggregateOutputType | null
    _max: QueryCacheMaxAggregateOutputType | null
  }

  type GetQueryCacheGroupByPayload<T extends QueryCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueryCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueryCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueryCacheGroupByOutputType[P]>
            : GetScalarType<T[P], QueryCacheGroupByOutputType[P]>
        }
      >
    >


  export type QueryCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queryHash?: boolean
    queryData?: boolean
    result?: boolean
    connectionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queryCache"]>

  export type QueryCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queryHash?: boolean
    queryData?: boolean
    result?: boolean
    connectionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queryCache"]>

  export type QueryCacheSelectScalar = {
    id?: boolean
    queryHash?: boolean
    queryData?: boolean
    result?: boolean
    connectionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type QueryCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }
  export type QueryCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }

  export type $QueryCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueryCache"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      queryHash: string
      queryData: Prisma.JsonValue
      result: Prisma.JsonValue
      connectionId: number
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["queryCache"]>
    composites: {}
  }

  type QueryCacheGetPayload<S extends boolean | null | undefined | QueryCacheDefaultArgs> = $Result.GetResult<Prisma.$QueryCachePayload, S>

  type QueryCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QueryCacheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QueryCacheCountAggregateInputType | true
    }

  export interface QueryCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueryCache'], meta: { name: 'QueryCache' } }
    /**
     * Find zero or one QueryCache that matches the filter.
     * @param {QueryCacheFindUniqueArgs} args - Arguments to find a QueryCache
     * @example
     * // Get one QueryCache
     * const queryCache = await prisma.queryCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueryCacheFindUniqueArgs>(args: SelectSubset<T, QueryCacheFindUniqueArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QueryCache that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QueryCacheFindUniqueOrThrowArgs} args - Arguments to find a QueryCache
     * @example
     * // Get one QueryCache
     * const queryCache = await prisma.queryCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueryCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, QueryCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QueryCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheFindFirstArgs} args - Arguments to find a QueryCache
     * @example
     * // Get one QueryCache
     * const queryCache = await prisma.queryCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueryCacheFindFirstArgs>(args?: SelectSubset<T, QueryCacheFindFirstArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QueryCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheFindFirstOrThrowArgs} args - Arguments to find a QueryCache
     * @example
     * // Get one QueryCache
     * const queryCache = await prisma.queryCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueryCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, QueryCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QueryCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueryCaches
     * const queryCaches = await prisma.queryCache.findMany()
     * 
     * // Get first 10 QueryCaches
     * const queryCaches = await prisma.queryCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queryCacheWithIdOnly = await prisma.queryCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueryCacheFindManyArgs>(args?: SelectSubset<T, QueryCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QueryCache.
     * @param {QueryCacheCreateArgs} args - Arguments to create a QueryCache.
     * @example
     * // Create one QueryCache
     * const QueryCache = await prisma.queryCache.create({
     *   data: {
     *     // ... data to create a QueryCache
     *   }
     * })
     * 
     */
    create<T extends QueryCacheCreateArgs>(args: SelectSubset<T, QueryCacheCreateArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QueryCaches.
     * @param {QueryCacheCreateManyArgs} args - Arguments to create many QueryCaches.
     * @example
     * // Create many QueryCaches
     * const queryCache = await prisma.queryCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueryCacheCreateManyArgs>(args?: SelectSubset<T, QueryCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueryCaches and returns the data saved in the database.
     * @param {QueryCacheCreateManyAndReturnArgs} args - Arguments to create many QueryCaches.
     * @example
     * // Create many QueryCaches
     * const queryCache = await prisma.queryCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueryCaches and only return the `id`
     * const queryCacheWithIdOnly = await prisma.queryCache.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueryCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, QueryCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QueryCache.
     * @param {QueryCacheDeleteArgs} args - Arguments to delete one QueryCache.
     * @example
     * // Delete one QueryCache
     * const QueryCache = await prisma.queryCache.delete({
     *   where: {
     *     // ... filter to delete one QueryCache
     *   }
     * })
     * 
     */
    delete<T extends QueryCacheDeleteArgs>(args: SelectSubset<T, QueryCacheDeleteArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QueryCache.
     * @param {QueryCacheUpdateArgs} args - Arguments to update one QueryCache.
     * @example
     * // Update one QueryCache
     * const queryCache = await prisma.queryCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueryCacheUpdateArgs>(args: SelectSubset<T, QueryCacheUpdateArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QueryCaches.
     * @param {QueryCacheDeleteManyArgs} args - Arguments to filter QueryCaches to delete.
     * @example
     * // Delete a few QueryCaches
     * const { count } = await prisma.queryCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueryCacheDeleteManyArgs>(args?: SelectSubset<T, QueryCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueryCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueryCaches
     * const queryCache = await prisma.queryCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueryCacheUpdateManyArgs>(args: SelectSubset<T, QueryCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QueryCache.
     * @param {QueryCacheUpsertArgs} args - Arguments to update or create a QueryCache.
     * @example
     * // Update or create a QueryCache
     * const queryCache = await prisma.queryCache.upsert({
     *   create: {
     *     // ... data to create a QueryCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueryCache we want to update
     *   }
     * })
     */
    upsert<T extends QueryCacheUpsertArgs>(args: SelectSubset<T, QueryCacheUpsertArgs<ExtArgs>>): Prisma__QueryCacheClient<$Result.GetResult<Prisma.$QueryCachePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QueryCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheCountArgs} args - Arguments to filter QueryCaches to count.
     * @example
     * // Count the number of QueryCaches
     * const count = await prisma.queryCache.count({
     *   where: {
     *     // ... the filter for the QueryCaches we want to count
     *   }
     * })
    **/
    count<T extends QueryCacheCountArgs>(
      args?: Subset<T, QueryCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueryCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueryCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueryCacheAggregateArgs>(args: Subset<T, QueryCacheAggregateArgs>): Prisma.PrismaPromise<GetQueryCacheAggregateType<T>>

    /**
     * Group by QueryCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueryCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueryCacheGroupByArgs['orderBy'] }
        : { orderBy?: QueryCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueryCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueryCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueryCache model
   */
  readonly fields: QueryCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueryCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueryCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueryCache model
   */ 
  interface QueryCacheFieldRefs {
    readonly id: FieldRef<"QueryCache", 'Int'>
    readonly queryHash: FieldRef<"QueryCache", 'String'>
    readonly queryData: FieldRef<"QueryCache", 'Json'>
    readonly result: FieldRef<"QueryCache", 'Json'>
    readonly connectionId: FieldRef<"QueryCache", 'Int'>
    readonly expiresAt: FieldRef<"QueryCache", 'DateTime'>
    readonly createdAt: FieldRef<"QueryCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueryCache findUnique
   */
  export type QueryCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter, which QueryCache to fetch.
     */
    where: QueryCacheWhereUniqueInput
  }

  /**
   * QueryCache findUniqueOrThrow
   */
  export type QueryCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter, which QueryCache to fetch.
     */
    where: QueryCacheWhereUniqueInput
  }

  /**
   * QueryCache findFirst
   */
  export type QueryCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter, which QueryCache to fetch.
     */
    where?: QueryCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryCaches to fetch.
     */
    orderBy?: QueryCacheOrderByWithRelationInput | QueryCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryCaches.
     */
    cursor?: QueryCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryCaches.
     */
    distinct?: QueryCacheScalarFieldEnum | QueryCacheScalarFieldEnum[]
  }

  /**
   * QueryCache findFirstOrThrow
   */
  export type QueryCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter, which QueryCache to fetch.
     */
    where?: QueryCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryCaches to fetch.
     */
    orderBy?: QueryCacheOrderByWithRelationInput | QueryCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryCaches.
     */
    cursor?: QueryCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryCaches.
     */
    distinct?: QueryCacheScalarFieldEnum | QueryCacheScalarFieldEnum[]
  }

  /**
   * QueryCache findMany
   */
  export type QueryCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter, which QueryCaches to fetch.
     */
    where?: QueryCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryCaches to fetch.
     */
    orderBy?: QueryCacheOrderByWithRelationInput | QueryCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueryCaches.
     */
    cursor?: QueryCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryCaches.
     */
    skip?: number
    distinct?: QueryCacheScalarFieldEnum | QueryCacheScalarFieldEnum[]
  }

  /**
   * QueryCache create
   */
  export type QueryCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a QueryCache.
     */
    data: XOR<QueryCacheCreateInput, QueryCacheUncheckedCreateInput>
  }

  /**
   * QueryCache createMany
   */
  export type QueryCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueryCaches.
     */
    data: QueryCacheCreateManyInput | QueryCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueryCache createManyAndReturn
   */
  export type QueryCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QueryCaches.
     */
    data: QueryCacheCreateManyInput | QueryCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueryCache update
   */
  export type QueryCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a QueryCache.
     */
    data: XOR<QueryCacheUpdateInput, QueryCacheUncheckedUpdateInput>
    /**
     * Choose, which QueryCache to update.
     */
    where: QueryCacheWhereUniqueInput
  }

  /**
   * QueryCache updateMany
   */
  export type QueryCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueryCaches.
     */
    data: XOR<QueryCacheUpdateManyMutationInput, QueryCacheUncheckedUpdateManyInput>
    /**
     * Filter which QueryCaches to update
     */
    where?: QueryCacheWhereInput
  }

  /**
   * QueryCache upsert
   */
  export type QueryCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the QueryCache to update in case it exists.
     */
    where: QueryCacheWhereUniqueInput
    /**
     * In case the QueryCache found by the `where` argument doesn't exist, create a new QueryCache with this data.
     */
    create: XOR<QueryCacheCreateInput, QueryCacheUncheckedCreateInput>
    /**
     * In case the QueryCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueryCacheUpdateInput, QueryCacheUncheckedUpdateInput>
  }

  /**
   * QueryCache delete
   */
  export type QueryCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
    /**
     * Filter which QueryCache to delete.
     */
    where: QueryCacheWhereUniqueInput
  }

  /**
   * QueryCache deleteMany
   */
  export type QueryCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryCaches to delete
     */
    where?: QueryCacheWhereInput
  }

  /**
   * QueryCache without action
   */
  export type QueryCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryCache
     */
    select?: QueryCacheSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryCacheInclude<ExtArgs> | null
  }


  /**
   * Model ColumnProfile
   */

  export type AggregateColumnProfile = {
    _count: ColumnProfileCountAggregateOutputType | null
    _avg: ColumnProfileAvgAggregateOutputType | null
    _sum: ColumnProfileSumAggregateOutputType | null
    _min: ColumnProfileMinAggregateOutputType | null
    _max: ColumnProfileMaxAggregateOutputType | null
  }

  export type ColumnProfileAvgAggregateOutputType = {
    id: number | null
    connectionId: number | null
    distinctCount: number | null
    totalCount: number | null
    nullCount: number | null
    rowEstimate: number | null
  }

  export type ColumnProfileSumAggregateOutputType = {
    id: number | null
    connectionId: number | null
    distinctCount: bigint | null
    totalCount: bigint | null
    nullCount: bigint | null
    rowEstimate: bigint | null
  }

  export type ColumnProfileMinAggregateOutputType = {
    id: number | null
    connectionId: number | null
    tableName: string | null
    columnName: string | null
    distinctCount: bigint | null
    totalCount: bigint | null
    min: string | null
    max: string | null
    nullCount: bigint | null
    lastUpdated: Date | null
    strategy: string | null
    rowEstimate: bigint | null
  }

  export type ColumnProfileMaxAggregateOutputType = {
    id: number | null
    connectionId: number | null
    tableName: string | null
    columnName: string | null
    distinctCount: bigint | null
    totalCount: bigint | null
    min: string | null
    max: string | null
    nullCount: bigint | null
    lastUpdated: Date | null
    strategy: string | null
    rowEstimate: bigint | null
  }

  export type ColumnProfileCountAggregateOutputType = {
    id: number
    connectionId: number
    tableName: number
    columnName: number
    distinctCount: number
    totalCount: number
    min: number
    max: number
    nullCount: number
    sampleValues: number
    lastUpdated: number
    strategy: number
    rowEstimate: number
    _all: number
  }


  export type ColumnProfileAvgAggregateInputType = {
    id?: true
    connectionId?: true
    distinctCount?: true
    totalCount?: true
    nullCount?: true
    rowEstimate?: true
  }

  export type ColumnProfileSumAggregateInputType = {
    id?: true
    connectionId?: true
    distinctCount?: true
    totalCount?: true
    nullCount?: true
    rowEstimate?: true
  }

  export type ColumnProfileMinAggregateInputType = {
    id?: true
    connectionId?: true
    tableName?: true
    columnName?: true
    distinctCount?: true
    totalCount?: true
    min?: true
    max?: true
    nullCount?: true
    lastUpdated?: true
    strategy?: true
    rowEstimate?: true
  }

  export type ColumnProfileMaxAggregateInputType = {
    id?: true
    connectionId?: true
    tableName?: true
    columnName?: true
    distinctCount?: true
    totalCount?: true
    min?: true
    max?: true
    nullCount?: true
    lastUpdated?: true
    strategy?: true
    rowEstimate?: true
  }

  export type ColumnProfileCountAggregateInputType = {
    id?: true
    connectionId?: true
    tableName?: true
    columnName?: true
    distinctCount?: true
    totalCount?: true
    min?: true
    max?: true
    nullCount?: true
    sampleValues?: true
    lastUpdated?: true
    strategy?: true
    rowEstimate?: true
    _all?: true
  }

  export type ColumnProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColumnProfile to aggregate.
     */
    where?: ColumnProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColumnProfiles to fetch.
     */
    orderBy?: ColumnProfileOrderByWithRelationInput | ColumnProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColumnProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColumnProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColumnProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ColumnProfiles
    **/
    _count?: true | ColumnProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColumnProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColumnProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColumnProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColumnProfileMaxAggregateInputType
  }

  export type GetColumnProfileAggregateType<T extends ColumnProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateColumnProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColumnProfile[P]>
      : GetScalarType<T[P], AggregateColumnProfile[P]>
  }




  export type ColumnProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnProfileWhereInput
    orderBy?: ColumnProfileOrderByWithAggregationInput | ColumnProfileOrderByWithAggregationInput[]
    by: ColumnProfileScalarFieldEnum[] | ColumnProfileScalarFieldEnum
    having?: ColumnProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColumnProfileCountAggregateInputType | true
    _avg?: ColumnProfileAvgAggregateInputType
    _sum?: ColumnProfileSumAggregateInputType
    _min?: ColumnProfileMinAggregateInputType
    _max?: ColumnProfileMaxAggregateInputType
  }

  export type ColumnProfileGroupByOutputType = {
    id: number
    connectionId: number
    tableName: string
    columnName: string
    distinctCount: bigint
    totalCount: bigint
    min: string | null
    max: string | null
    nullCount: bigint | null
    sampleValues: JsonValue
    lastUpdated: Date
    strategy: string
    rowEstimate: bigint | null
    _count: ColumnProfileCountAggregateOutputType | null
    _avg: ColumnProfileAvgAggregateOutputType | null
    _sum: ColumnProfileSumAggregateOutputType | null
    _min: ColumnProfileMinAggregateOutputType | null
    _max: ColumnProfileMaxAggregateOutputType | null
  }

  type GetColumnProfileGroupByPayload<T extends ColumnProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColumnProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColumnProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColumnProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ColumnProfileGroupByOutputType[P]>
        }
      >
    >


  export type ColumnProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    tableName?: boolean
    columnName?: boolean
    distinctCount?: boolean
    totalCount?: boolean
    min?: boolean
    max?: boolean
    nullCount?: boolean
    sampleValues?: boolean
    lastUpdated?: boolean
    strategy?: boolean
    rowEstimate?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["columnProfile"]>

  export type ColumnProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    tableName?: boolean
    columnName?: boolean
    distinctCount?: boolean
    totalCount?: boolean
    min?: boolean
    max?: boolean
    nullCount?: boolean
    sampleValues?: boolean
    lastUpdated?: boolean
    strategy?: boolean
    rowEstimate?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["columnProfile"]>

  export type ColumnProfileSelectScalar = {
    id?: boolean
    connectionId?: boolean
    tableName?: boolean
    columnName?: boolean
    distinctCount?: boolean
    totalCount?: boolean
    min?: boolean
    max?: boolean
    nullCount?: boolean
    sampleValues?: boolean
    lastUpdated?: boolean
    strategy?: boolean
    rowEstimate?: boolean
  }

  export type ColumnProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }
  export type ColumnProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }

  export type $ColumnProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ColumnProfile"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      connectionId: number
      tableName: string
      columnName: string
      distinctCount: bigint
      totalCount: bigint
      min: string | null
      max: string | null
      nullCount: bigint | null
      sampleValues: Prisma.JsonValue
      lastUpdated: Date
      strategy: string
      rowEstimate: bigint | null
    }, ExtArgs["result"]["columnProfile"]>
    composites: {}
  }

  type ColumnProfileGetPayload<S extends boolean | null | undefined | ColumnProfileDefaultArgs> = $Result.GetResult<Prisma.$ColumnProfilePayload, S>

  type ColumnProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ColumnProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ColumnProfileCountAggregateInputType | true
    }

  export interface ColumnProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ColumnProfile'], meta: { name: 'ColumnProfile' } }
    /**
     * Find zero or one ColumnProfile that matches the filter.
     * @param {ColumnProfileFindUniqueArgs} args - Arguments to find a ColumnProfile
     * @example
     * // Get one ColumnProfile
     * const columnProfile = await prisma.columnProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColumnProfileFindUniqueArgs>(args: SelectSubset<T, ColumnProfileFindUniqueArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ColumnProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ColumnProfileFindUniqueOrThrowArgs} args - Arguments to find a ColumnProfile
     * @example
     * // Get one ColumnProfile
     * const columnProfile = await prisma.columnProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColumnProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ColumnProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ColumnProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileFindFirstArgs} args - Arguments to find a ColumnProfile
     * @example
     * // Get one ColumnProfile
     * const columnProfile = await prisma.columnProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColumnProfileFindFirstArgs>(args?: SelectSubset<T, ColumnProfileFindFirstArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ColumnProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileFindFirstOrThrowArgs} args - Arguments to find a ColumnProfile
     * @example
     * // Get one ColumnProfile
     * const columnProfile = await prisma.columnProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColumnProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ColumnProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ColumnProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ColumnProfiles
     * const columnProfiles = await prisma.columnProfile.findMany()
     * 
     * // Get first 10 ColumnProfiles
     * const columnProfiles = await prisma.columnProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const columnProfileWithIdOnly = await prisma.columnProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColumnProfileFindManyArgs>(args?: SelectSubset<T, ColumnProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ColumnProfile.
     * @param {ColumnProfileCreateArgs} args - Arguments to create a ColumnProfile.
     * @example
     * // Create one ColumnProfile
     * const ColumnProfile = await prisma.columnProfile.create({
     *   data: {
     *     // ... data to create a ColumnProfile
     *   }
     * })
     * 
     */
    create<T extends ColumnProfileCreateArgs>(args: SelectSubset<T, ColumnProfileCreateArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ColumnProfiles.
     * @param {ColumnProfileCreateManyArgs} args - Arguments to create many ColumnProfiles.
     * @example
     * // Create many ColumnProfiles
     * const columnProfile = await prisma.columnProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColumnProfileCreateManyArgs>(args?: SelectSubset<T, ColumnProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ColumnProfiles and returns the data saved in the database.
     * @param {ColumnProfileCreateManyAndReturnArgs} args - Arguments to create many ColumnProfiles.
     * @example
     * // Create many ColumnProfiles
     * const columnProfile = await prisma.columnProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ColumnProfiles and only return the `id`
     * const columnProfileWithIdOnly = await prisma.columnProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColumnProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ColumnProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ColumnProfile.
     * @param {ColumnProfileDeleteArgs} args - Arguments to delete one ColumnProfile.
     * @example
     * // Delete one ColumnProfile
     * const ColumnProfile = await prisma.columnProfile.delete({
     *   where: {
     *     // ... filter to delete one ColumnProfile
     *   }
     * })
     * 
     */
    delete<T extends ColumnProfileDeleteArgs>(args: SelectSubset<T, ColumnProfileDeleteArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ColumnProfile.
     * @param {ColumnProfileUpdateArgs} args - Arguments to update one ColumnProfile.
     * @example
     * // Update one ColumnProfile
     * const columnProfile = await prisma.columnProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColumnProfileUpdateArgs>(args: SelectSubset<T, ColumnProfileUpdateArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ColumnProfiles.
     * @param {ColumnProfileDeleteManyArgs} args - Arguments to filter ColumnProfiles to delete.
     * @example
     * // Delete a few ColumnProfiles
     * const { count } = await prisma.columnProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColumnProfileDeleteManyArgs>(args?: SelectSubset<T, ColumnProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ColumnProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ColumnProfiles
     * const columnProfile = await prisma.columnProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColumnProfileUpdateManyArgs>(args: SelectSubset<T, ColumnProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ColumnProfile.
     * @param {ColumnProfileUpsertArgs} args - Arguments to update or create a ColumnProfile.
     * @example
     * // Update or create a ColumnProfile
     * const columnProfile = await prisma.columnProfile.upsert({
     *   create: {
     *     // ... data to create a ColumnProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ColumnProfile we want to update
     *   }
     * })
     */
    upsert<T extends ColumnProfileUpsertArgs>(args: SelectSubset<T, ColumnProfileUpsertArgs<ExtArgs>>): Prisma__ColumnProfileClient<$Result.GetResult<Prisma.$ColumnProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ColumnProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileCountArgs} args - Arguments to filter ColumnProfiles to count.
     * @example
     * // Count the number of ColumnProfiles
     * const count = await prisma.columnProfile.count({
     *   where: {
     *     // ... the filter for the ColumnProfiles we want to count
     *   }
     * })
    **/
    count<T extends ColumnProfileCountArgs>(
      args?: Subset<T, ColumnProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColumnProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ColumnProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColumnProfileAggregateArgs>(args: Subset<T, ColumnProfileAggregateArgs>): Prisma.PrismaPromise<GetColumnProfileAggregateType<T>>

    /**
     * Group by ColumnProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColumnProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColumnProfileGroupByArgs['orderBy'] }
        : { orderBy?: ColumnProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColumnProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColumnProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ColumnProfile model
   */
  readonly fields: ColumnProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ColumnProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColumnProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ColumnProfile model
   */ 
  interface ColumnProfileFieldRefs {
    readonly id: FieldRef<"ColumnProfile", 'Int'>
    readonly connectionId: FieldRef<"ColumnProfile", 'Int'>
    readonly tableName: FieldRef<"ColumnProfile", 'String'>
    readonly columnName: FieldRef<"ColumnProfile", 'String'>
    readonly distinctCount: FieldRef<"ColumnProfile", 'BigInt'>
    readonly totalCount: FieldRef<"ColumnProfile", 'BigInt'>
    readonly min: FieldRef<"ColumnProfile", 'String'>
    readonly max: FieldRef<"ColumnProfile", 'String'>
    readonly nullCount: FieldRef<"ColumnProfile", 'BigInt'>
    readonly sampleValues: FieldRef<"ColumnProfile", 'Json'>
    readonly lastUpdated: FieldRef<"ColumnProfile", 'DateTime'>
    readonly strategy: FieldRef<"ColumnProfile", 'String'>
    readonly rowEstimate: FieldRef<"ColumnProfile", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * ColumnProfile findUnique
   */
  export type ColumnProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter, which ColumnProfile to fetch.
     */
    where: ColumnProfileWhereUniqueInput
  }

  /**
   * ColumnProfile findUniqueOrThrow
   */
  export type ColumnProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter, which ColumnProfile to fetch.
     */
    where: ColumnProfileWhereUniqueInput
  }

  /**
   * ColumnProfile findFirst
   */
  export type ColumnProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter, which ColumnProfile to fetch.
     */
    where?: ColumnProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColumnProfiles to fetch.
     */
    orderBy?: ColumnProfileOrderByWithRelationInput | ColumnProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColumnProfiles.
     */
    cursor?: ColumnProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColumnProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColumnProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColumnProfiles.
     */
    distinct?: ColumnProfileScalarFieldEnum | ColumnProfileScalarFieldEnum[]
  }

  /**
   * ColumnProfile findFirstOrThrow
   */
  export type ColumnProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter, which ColumnProfile to fetch.
     */
    where?: ColumnProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColumnProfiles to fetch.
     */
    orderBy?: ColumnProfileOrderByWithRelationInput | ColumnProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ColumnProfiles.
     */
    cursor?: ColumnProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColumnProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColumnProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ColumnProfiles.
     */
    distinct?: ColumnProfileScalarFieldEnum | ColumnProfileScalarFieldEnum[]
  }

  /**
   * ColumnProfile findMany
   */
  export type ColumnProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter, which ColumnProfiles to fetch.
     */
    where?: ColumnProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ColumnProfiles to fetch.
     */
    orderBy?: ColumnProfileOrderByWithRelationInput | ColumnProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ColumnProfiles.
     */
    cursor?: ColumnProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ColumnProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ColumnProfiles.
     */
    skip?: number
    distinct?: ColumnProfileScalarFieldEnum | ColumnProfileScalarFieldEnum[]
  }

  /**
   * ColumnProfile create
   */
  export type ColumnProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a ColumnProfile.
     */
    data: XOR<ColumnProfileCreateInput, ColumnProfileUncheckedCreateInput>
  }

  /**
   * ColumnProfile createMany
   */
  export type ColumnProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ColumnProfiles.
     */
    data: ColumnProfileCreateManyInput | ColumnProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ColumnProfile createManyAndReturn
   */
  export type ColumnProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ColumnProfiles.
     */
    data: ColumnProfileCreateManyInput | ColumnProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ColumnProfile update
   */
  export type ColumnProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a ColumnProfile.
     */
    data: XOR<ColumnProfileUpdateInput, ColumnProfileUncheckedUpdateInput>
    /**
     * Choose, which ColumnProfile to update.
     */
    where: ColumnProfileWhereUniqueInput
  }

  /**
   * ColumnProfile updateMany
   */
  export type ColumnProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ColumnProfiles.
     */
    data: XOR<ColumnProfileUpdateManyMutationInput, ColumnProfileUncheckedUpdateManyInput>
    /**
     * Filter which ColumnProfiles to update
     */
    where?: ColumnProfileWhereInput
  }

  /**
   * ColumnProfile upsert
   */
  export type ColumnProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the ColumnProfile to update in case it exists.
     */
    where: ColumnProfileWhereUniqueInput
    /**
     * In case the ColumnProfile found by the `where` argument doesn't exist, create a new ColumnProfile with this data.
     */
    create: XOR<ColumnProfileCreateInput, ColumnProfileUncheckedCreateInput>
    /**
     * In case the ColumnProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColumnProfileUpdateInput, ColumnProfileUncheckedUpdateInput>
  }

  /**
   * ColumnProfile delete
   */
  export type ColumnProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
    /**
     * Filter which ColumnProfile to delete.
     */
    where: ColumnProfileWhereUniqueInput
  }

  /**
   * ColumnProfile deleteMany
   */
  export type ColumnProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ColumnProfiles to delete
     */
    where?: ColumnProfileWhereInput
  }

  /**
   * ColumnProfile without action
   */
  export type ColumnProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnProfile
     */
    select?: ColumnProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnProfileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConnectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    host: 'host',
    port: 'port',
    user: 'user',
    password: 'password',
    database: 'database',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
  };

  export type ConnectionScalarFieldEnum = (typeof ConnectionScalarFieldEnum)[keyof typeof ConnectionScalarFieldEnum]


  export const CanvasScalarFieldEnum: {
    id: 'id',
    name: 'name',
    data: 'data',
    connectionId: 'connectionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
  };

  export type CanvasScalarFieldEnum = (typeof CanvasScalarFieldEnum)[keyof typeof CanvasScalarFieldEnum]


  export const TableRelationshipScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    sourceTable: 'sourceTable',
    sourceColumn: 'sourceColumn',
    targetTable: 'targetTable',
    targetColumn: 'targetColumn',
    relationshipType: 'relationshipType',
    detectionMethod: 'detectionMethod',
    confidence: 'confidence',
    constraintName: 'constraintName',
    connectionId: 'connectionId',
    isActive: 'isActive',
    isCustom: 'isCustom',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patternRuleId: 'patternRuleId',
    ownerId: 'ownerId'
  };

  export type TableRelationshipScalarFieldEnum = (typeof TableRelationshipScalarFieldEnum)[keyof typeof TableRelationshipScalarFieldEnum]


  export const PatternRuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    sourcePattern: 'sourcePattern',
    targetPattern: 'targetPattern',
    relationshipType: 'relationshipType',
    priority: 'priority',
    isEnabled: 'isEnabled',
    minConfidence: 'minConfidence',
    connectionId: 'connectionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId'
  };

  export type PatternRuleScalarFieldEnum = (typeof PatternRuleScalarFieldEnum)[keyof typeof PatternRuleScalarFieldEnum]


  export const DeepQueryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    startTable: 'startTable',
    startCondition: 'startCondition',
    maxDepth: 'maxDepth',
    includeFields: 'includeFields',
    excludeFields: 'excludeFields',
    connectionId: 'connectionId',
    useCache: 'useCache',
    cacheDuration: 'cacheDuration',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastResult: 'lastResult',
    lastExecutedAt: 'lastExecutedAt',
    executionTime: 'executionTime',
    ownerId: 'ownerId'
  };

  export type DeepQueryScalarFieldEnum = (typeof DeepQueryScalarFieldEnum)[keyof typeof DeepQueryScalarFieldEnum]


  export const QueryCacheScalarFieldEnum: {
    id: 'id',
    queryHash: 'queryHash',
    queryData: 'queryData',
    result: 'result',
    connectionId: 'connectionId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type QueryCacheScalarFieldEnum = (typeof QueryCacheScalarFieldEnum)[keyof typeof QueryCacheScalarFieldEnum]


  export const ColumnProfileScalarFieldEnum: {
    id: 'id',
    connectionId: 'connectionId',
    tableName: 'tableName',
    columnName: 'columnName',
    distinctCount: 'distinctCount',
    totalCount: 'totalCount',
    min: 'min',
    max: 'max',
    nullCount: 'nullCount',
    sampleValues: 'sampleValues',
    lastUpdated: 'lastUpdated',
    strategy: 'strategy',
    rowEstimate: 'rowEstimate'
  };

  export type ColumnProfileScalarFieldEnum = (typeof ColumnProfileScalarFieldEnum)[keyof typeof ColumnProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'TableRelationshipType'
   */
  export type EnumTableRelationshipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TableRelationshipType'>
    


  /**
   * Reference to a field of type 'TableRelationshipType[]'
   */
  export type ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TableRelationshipType[]'>
    


  /**
   * Reference to a field of type 'DetectionMethod'
   */
  export type EnumDetectionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DetectionMethod'>
    


  /**
   * Reference to a field of type 'DetectionMethod[]'
   */
  export type ListEnumDetectionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DetectionMethod[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    connections?: ConnectionListRelationFilter
    canvases?: CanvasListRelationFilter
    tableRelationships?: TableRelationshipListRelationFilter
    patternRules?: PatternRuleListRelationFilter
    deepQueries?: DeepQueryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    connections?: ConnectionOrderByRelationAggregateInput
    canvases?: CanvasOrderByRelationAggregateInput
    tableRelationships?: TableRelationshipOrderByRelationAggregateInput
    patternRules?: PatternRuleOrderByRelationAggregateInput
    deepQueries?: DeepQueryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    connections?: ConnectionListRelationFilter
    canvases?: CanvasListRelationFilter
    tableRelationships?: TableRelationshipListRelationFilter
    patternRules?: PatternRuleListRelationFilter
    deepQueries?: DeepQueryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConnectionWhereInput = {
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    id?: IntFilter<"Connection"> | number
    name?: StringFilter<"Connection"> | string
    type?: StringFilter<"Connection"> | string
    host?: StringFilter<"Connection"> | string
    port?: IntFilter<"Connection"> | number
    user?: StringFilter<"Connection"> | string
    password?: StringFilter<"Connection"> | string
    database?: StringFilter<"Connection"> | string
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    ownerId?: IntNullableFilter<"Connection"> | number | null
    canvases?: CanvasListRelationFilter
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tableRelationships?: TableRelationshipListRelationFilter
    patternRules?: PatternRuleListRelationFilter
    deepQueries?: DeepQueryListRelationFilter
    queryCaches?: QueryCacheListRelationFilter
    columnProfiles?: ColumnProfileListRelationFilter
  }

  export type ConnectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    host?: SortOrder
    port?: SortOrder
    user?: SortOrder
    password?: SortOrder
    database?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    canvases?: CanvasOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
    tableRelationships?: TableRelationshipOrderByRelationAggregateInput
    patternRules?: PatternRuleOrderByRelationAggregateInput
    deepQueries?: DeepQueryOrderByRelationAggregateInput
    queryCaches?: QueryCacheOrderByRelationAggregateInput
    columnProfiles?: ColumnProfileOrderByRelationAggregateInput
  }

  export type ConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    name?: StringFilter<"Connection"> | string
    type?: StringFilter<"Connection"> | string
    host?: StringFilter<"Connection"> | string
    port?: IntFilter<"Connection"> | number
    user?: StringFilter<"Connection"> | string
    password?: StringFilter<"Connection"> | string
    database?: StringFilter<"Connection"> | string
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    ownerId?: IntNullableFilter<"Connection"> | number | null
    canvases?: CanvasListRelationFilter
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    tableRelationships?: TableRelationshipListRelationFilter
    patternRules?: PatternRuleListRelationFilter
    deepQueries?: DeepQueryListRelationFilter
    queryCaches?: QueryCacheListRelationFilter
    columnProfiles?: ColumnProfileListRelationFilter
  }, "id">

  export type ConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    host?: SortOrder
    port?: SortOrder
    user?: SortOrder
    password?: SortOrder
    database?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: ConnectionCountOrderByAggregateInput
    _avg?: ConnectionAvgOrderByAggregateInput
    _max?: ConnectionMaxOrderByAggregateInput
    _min?: ConnectionMinOrderByAggregateInput
    _sum?: ConnectionSumOrderByAggregateInput
  }

  export type ConnectionScalarWhereWithAggregatesInput = {
    AND?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    OR?: ConnectionScalarWhereWithAggregatesInput[]
    NOT?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Connection"> | number
    name?: StringWithAggregatesFilter<"Connection"> | string
    type?: StringWithAggregatesFilter<"Connection"> | string
    host?: StringWithAggregatesFilter<"Connection"> | string
    port?: IntWithAggregatesFilter<"Connection"> | number
    user?: StringWithAggregatesFilter<"Connection"> | string
    password?: StringWithAggregatesFilter<"Connection"> | string
    database?: StringWithAggregatesFilter<"Connection"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
    ownerId?: IntNullableWithAggregatesFilter<"Connection"> | number | null
  }

  export type CanvasWhereInput = {
    AND?: CanvasWhereInput | CanvasWhereInput[]
    OR?: CanvasWhereInput[]
    NOT?: CanvasWhereInput | CanvasWhereInput[]
    id?: IntFilter<"Canvas"> | number
    name?: StringFilter<"Canvas"> | string
    data?: JsonFilter<"Canvas">
    connectionId?: IntNullableFilter<"Canvas"> | number | null
    createdAt?: DateTimeFilter<"Canvas"> | Date | string
    updatedAt?: DateTimeFilter<"Canvas"> | Date | string
    ownerId?: IntNullableFilter<"Canvas"> | number | null
    connection?: XOR<ConnectionNullableRelationFilter, ConnectionWhereInput> | null
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type CanvasOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    data?: SortOrder
    connectionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    connection?: ConnectionOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type CanvasWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CanvasWhereInput | CanvasWhereInput[]
    OR?: CanvasWhereInput[]
    NOT?: CanvasWhereInput | CanvasWhereInput[]
    name?: StringFilter<"Canvas"> | string
    data?: JsonFilter<"Canvas">
    connectionId?: IntNullableFilter<"Canvas"> | number | null
    createdAt?: DateTimeFilter<"Canvas"> | Date | string
    updatedAt?: DateTimeFilter<"Canvas"> | Date | string
    ownerId?: IntNullableFilter<"Canvas"> | number | null
    connection?: XOR<ConnectionNullableRelationFilter, ConnectionWhereInput> | null
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type CanvasOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    data?: SortOrder
    connectionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: CanvasCountOrderByAggregateInput
    _avg?: CanvasAvgOrderByAggregateInput
    _max?: CanvasMaxOrderByAggregateInput
    _min?: CanvasMinOrderByAggregateInput
    _sum?: CanvasSumOrderByAggregateInput
  }

  export type CanvasScalarWhereWithAggregatesInput = {
    AND?: CanvasScalarWhereWithAggregatesInput | CanvasScalarWhereWithAggregatesInput[]
    OR?: CanvasScalarWhereWithAggregatesInput[]
    NOT?: CanvasScalarWhereWithAggregatesInput | CanvasScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Canvas"> | number
    name?: StringWithAggregatesFilter<"Canvas"> | string
    data?: JsonWithAggregatesFilter<"Canvas">
    connectionId?: IntNullableWithAggregatesFilter<"Canvas"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Canvas"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Canvas"> | Date | string
    ownerId?: IntNullableWithAggregatesFilter<"Canvas"> | number | null
  }

  export type TableRelationshipWhereInput = {
    AND?: TableRelationshipWhereInput | TableRelationshipWhereInput[]
    OR?: TableRelationshipWhereInput[]
    NOT?: TableRelationshipWhereInput | TableRelationshipWhereInput[]
    id?: IntFilter<"TableRelationship"> | number
    name?: StringNullableFilter<"TableRelationship"> | string | null
    description?: StringNullableFilter<"TableRelationship"> | string | null
    sourceTable?: StringFilter<"TableRelationship"> | string
    sourceColumn?: StringFilter<"TableRelationship"> | string
    targetTable?: StringFilter<"TableRelationship"> | string
    targetColumn?: StringFilter<"TableRelationship"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"TableRelationship"> | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFilter<"TableRelationship"> | $Enums.DetectionMethod
    confidence?: FloatNullableFilter<"TableRelationship"> | number | null
    constraintName?: StringNullableFilter<"TableRelationship"> | string | null
    connectionId?: IntFilter<"TableRelationship"> | number
    isActive?: BoolFilter<"TableRelationship"> | boolean
    isCustom?: BoolFilter<"TableRelationship"> | boolean
    createdAt?: DateTimeFilter<"TableRelationship"> | Date | string
    updatedAt?: DateTimeFilter<"TableRelationship"> | Date | string
    patternRuleId?: IntNullableFilter<"TableRelationship"> | number | null
    ownerId?: IntNullableFilter<"TableRelationship"> | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    patternRule?: XOR<PatternRuleNullableRelationFilter, PatternRuleWhereInput> | null
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type TableRelationshipOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    sourceTable?: SortOrder
    sourceColumn?: SortOrder
    targetTable?: SortOrder
    targetColumn?: SortOrder
    relationshipType?: SortOrder
    detectionMethod?: SortOrder
    confidence?: SortOrderInput | SortOrder
    constraintName?: SortOrderInput | SortOrder
    connectionId?: SortOrder
    isActive?: SortOrder
    isCustom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patternRuleId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    connection?: ConnectionOrderByWithRelationInput
    patternRule?: PatternRuleOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type TableRelationshipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    connectionId_sourceTable_sourceColumn_targetTable_targetColumn?: TableRelationshipConnectionIdSourceTableSourceColumnTargetTableTargetColumnCompoundUniqueInput
    AND?: TableRelationshipWhereInput | TableRelationshipWhereInput[]
    OR?: TableRelationshipWhereInput[]
    NOT?: TableRelationshipWhereInput | TableRelationshipWhereInput[]
    name?: StringNullableFilter<"TableRelationship"> | string | null
    description?: StringNullableFilter<"TableRelationship"> | string | null
    sourceTable?: StringFilter<"TableRelationship"> | string
    sourceColumn?: StringFilter<"TableRelationship"> | string
    targetTable?: StringFilter<"TableRelationship"> | string
    targetColumn?: StringFilter<"TableRelationship"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"TableRelationship"> | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFilter<"TableRelationship"> | $Enums.DetectionMethod
    confidence?: FloatNullableFilter<"TableRelationship"> | number | null
    constraintName?: StringNullableFilter<"TableRelationship"> | string | null
    connectionId?: IntFilter<"TableRelationship"> | number
    isActive?: BoolFilter<"TableRelationship"> | boolean
    isCustom?: BoolFilter<"TableRelationship"> | boolean
    createdAt?: DateTimeFilter<"TableRelationship"> | Date | string
    updatedAt?: DateTimeFilter<"TableRelationship"> | Date | string
    patternRuleId?: IntNullableFilter<"TableRelationship"> | number | null
    ownerId?: IntNullableFilter<"TableRelationship"> | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    patternRule?: XOR<PatternRuleNullableRelationFilter, PatternRuleWhereInput> | null
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "connectionId_sourceTable_sourceColumn_targetTable_targetColumn">

  export type TableRelationshipOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    sourceTable?: SortOrder
    sourceColumn?: SortOrder
    targetTable?: SortOrder
    targetColumn?: SortOrder
    relationshipType?: SortOrder
    detectionMethod?: SortOrder
    confidence?: SortOrderInput | SortOrder
    constraintName?: SortOrderInput | SortOrder
    connectionId?: SortOrder
    isActive?: SortOrder
    isCustom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patternRuleId?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: TableRelationshipCountOrderByAggregateInput
    _avg?: TableRelationshipAvgOrderByAggregateInput
    _max?: TableRelationshipMaxOrderByAggregateInput
    _min?: TableRelationshipMinOrderByAggregateInput
    _sum?: TableRelationshipSumOrderByAggregateInput
  }

  export type TableRelationshipScalarWhereWithAggregatesInput = {
    AND?: TableRelationshipScalarWhereWithAggregatesInput | TableRelationshipScalarWhereWithAggregatesInput[]
    OR?: TableRelationshipScalarWhereWithAggregatesInput[]
    NOT?: TableRelationshipScalarWhereWithAggregatesInput | TableRelationshipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TableRelationship"> | number
    name?: StringNullableWithAggregatesFilter<"TableRelationship"> | string | null
    description?: StringNullableWithAggregatesFilter<"TableRelationship"> | string | null
    sourceTable?: StringWithAggregatesFilter<"TableRelationship"> | string
    sourceColumn?: StringWithAggregatesFilter<"TableRelationship"> | string
    targetTable?: StringWithAggregatesFilter<"TableRelationship"> | string
    targetColumn?: StringWithAggregatesFilter<"TableRelationship"> | string
    relationshipType?: EnumTableRelationshipTypeWithAggregatesFilter<"TableRelationship"> | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodWithAggregatesFilter<"TableRelationship"> | $Enums.DetectionMethod
    confidence?: FloatNullableWithAggregatesFilter<"TableRelationship"> | number | null
    constraintName?: StringNullableWithAggregatesFilter<"TableRelationship"> | string | null
    connectionId?: IntWithAggregatesFilter<"TableRelationship"> | number
    isActive?: BoolWithAggregatesFilter<"TableRelationship"> | boolean
    isCustom?: BoolWithAggregatesFilter<"TableRelationship"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TableRelationship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TableRelationship"> | Date | string
    patternRuleId?: IntNullableWithAggregatesFilter<"TableRelationship"> | number | null
    ownerId?: IntNullableWithAggregatesFilter<"TableRelationship"> | number | null
  }

  export type PatternRuleWhereInput = {
    AND?: PatternRuleWhereInput | PatternRuleWhereInput[]
    OR?: PatternRuleWhereInput[]
    NOT?: PatternRuleWhereInput | PatternRuleWhereInput[]
    id?: IntFilter<"PatternRule"> | number
    name?: StringFilter<"PatternRule"> | string
    description?: StringNullableFilter<"PatternRule"> | string | null
    sourcePattern?: StringFilter<"PatternRule"> | string
    targetPattern?: StringFilter<"PatternRule"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"PatternRule"> | $Enums.TableRelationshipType
    priority?: IntFilter<"PatternRule"> | number
    isEnabled?: BoolFilter<"PatternRule"> | boolean
    minConfidence?: FloatNullableFilter<"PatternRule"> | number | null
    connectionId?: IntNullableFilter<"PatternRule"> | number | null
    createdAt?: DateTimeFilter<"PatternRule"> | Date | string
    updatedAt?: DateTimeFilter<"PatternRule"> | Date | string
    ownerId?: IntNullableFilter<"PatternRule"> | number | null
    connection?: XOR<ConnectionNullableRelationFilter, ConnectionWhereInput> | null
    tableRelationships?: TableRelationshipListRelationFilter
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type PatternRuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sourcePattern?: SortOrder
    targetPattern?: SortOrder
    relationshipType?: SortOrder
    priority?: SortOrder
    isEnabled?: SortOrder
    minConfidence?: SortOrderInput | SortOrder
    connectionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    connection?: ConnectionOrderByWithRelationInput
    tableRelationships?: TableRelationshipOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
  }

  export type PatternRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PatternRuleWhereInput | PatternRuleWhereInput[]
    OR?: PatternRuleWhereInput[]
    NOT?: PatternRuleWhereInput | PatternRuleWhereInput[]
    name?: StringFilter<"PatternRule"> | string
    description?: StringNullableFilter<"PatternRule"> | string | null
    sourcePattern?: StringFilter<"PatternRule"> | string
    targetPattern?: StringFilter<"PatternRule"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"PatternRule"> | $Enums.TableRelationshipType
    priority?: IntFilter<"PatternRule"> | number
    isEnabled?: BoolFilter<"PatternRule"> | boolean
    minConfidence?: FloatNullableFilter<"PatternRule"> | number | null
    connectionId?: IntNullableFilter<"PatternRule"> | number | null
    createdAt?: DateTimeFilter<"PatternRule"> | Date | string
    updatedAt?: DateTimeFilter<"PatternRule"> | Date | string
    ownerId?: IntNullableFilter<"PatternRule"> | number | null
    connection?: XOR<ConnectionNullableRelationFilter, ConnectionWhereInput> | null
    tableRelationships?: TableRelationshipListRelationFilter
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type PatternRuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sourcePattern?: SortOrder
    targetPattern?: SortOrder
    relationshipType?: SortOrder
    priority?: SortOrder
    isEnabled?: SortOrder
    minConfidence?: SortOrderInput | SortOrder
    connectionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: PatternRuleCountOrderByAggregateInput
    _avg?: PatternRuleAvgOrderByAggregateInput
    _max?: PatternRuleMaxOrderByAggregateInput
    _min?: PatternRuleMinOrderByAggregateInput
    _sum?: PatternRuleSumOrderByAggregateInput
  }

  export type PatternRuleScalarWhereWithAggregatesInput = {
    AND?: PatternRuleScalarWhereWithAggregatesInput | PatternRuleScalarWhereWithAggregatesInput[]
    OR?: PatternRuleScalarWhereWithAggregatesInput[]
    NOT?: PatternRuleScalarWhereWithAggregatesInput | PatternRuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PatternRule"> | number
    name?: StringWithAggregatesFilter<"PatternRule"> | string
    description?: StringNullableWithAggregatesFilter<"PatternRule"> | string | null
    sourcePattern?: StringWithAggregatesFilter<"PatternRule"> | string
    targetPattern?: StringWithAggregatesFilter<"PatternRule"> | string
    relationshipType?: EnumTableRelationshipTypeWithAggregatesFilter<"PatternRule"> | $Enums.TableRelationshipType
    priority?: IntWithAggregatesFilter<"PatternRule"> | number
    isEnabled?: BoolWithAggregatesFilter<"PatternRule"> | boolean
    minConfidence?: FloatNullableWithAggregatesFilter<"PatternRule"> | number | null
    connectionId?: IntNullableWithAggregatesFilter<"PatternRule"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"PatternRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatternRule"> | Date | string
    ownerId?: IntNullableWithAggregatesFilter<"PatternRule"> | number | null
  }

  export type DeepQueryWhereInput = {
    AND?: DeepQueryWhereInput | DeepQueryWhereInput[]
    OR?: DeepQueryWhereInput[]
    NOT?: DeepQueryWhereInput | DeepQueryWhereInput[]
    id?: IntFilter<"DeepQuery"> | number
    name?: StringFilter<"DeepQuery"> | string
    description?: StringNullableFilter<"DeepQuery"> | string | null
    startTable?: StringFilter<"DeepQuery"> | string
    startCondition?: JsonNullableFilter<"DeepQuery">
    maxDepth?: IntFilter<"DeepQuery"> | number
    includeFields?: JsonNullableFilter<"DeepQuery">
    excludeFields?: JsonNullableFilter<"DeepQuery">
    connectionId?: IntFilter<"DeepQuery"> | number
    useCache?: BoolFilter<"DeepQuery"> | boolean
    cacheDuration?: IntNullableFilter<"DeepQuery"> | number | null
    isActive?: BoolFilter<"DeepQuery"> | boolean
    createdAt?: DateTimeFilter<"DeepQuery"> | Date | string
    updatedAt?: DateTimeFilter<"DeepQuery"> | Date | string
    lastResult?: JsonNullableFilter<"DeepQuery">
    lastExecutedAt?: DateTimeNullableFilter<"DeepQuery"> | Date | string | null
    executionTime?: IntNullableFilter<"DeepQuery"> | number | null
    ownerId?: IntNullableFilter<"DeepQuery"> | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type DeepQueryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startTable?: SortOrder
    startCondition?: SortOrderInput | SortOrder
    maxDepth?: SortOrder
    includeFields?: SortOrderInput | SortOrder
    excludeFields?: SortOrderInput | SortOrder
    connectionId?: SortOrder
    useCache?: SortOrder
    cacheDuration?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastResult?: SortOrderInput | SortOrder
    lastExecutedAt?: SortOrderInput | SortOrder
    executionTime?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    connection?: ConnectionOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type DeepQueryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DeepQueryWhereInput | DeepQueryWhereInput[]
    OR?: DeepQueryWhereInput[]
    NOT?: DeepQueryWhereInput | DeepQueryWhereInput[]
    name?: StringFilter<"DeepQuery"> | string
    description?: StringNullableFilter<"DeepQuery"> | string | null
    startTable?: StringFilter<"DeepQuery"> | string
    startCondition?: JsonNullableFilter<"DeepQuery">
    maxDepth?: IntFilter<"DeepQuery"> | number
    includeFields?: JsonNullableFilter<"DeepQuery">
    excludeFields?: JsonNullableFilter<"DeepQuery">
    connectionId?: IntFilter<"DeepQuery"> | number
    useCache?: BoolFilter<"DeepQuery"> | boolean
    cacheDuration?: IntNullableFilter<"DeepQuery"> | number | null
    isActive?: BoolFilter<"DeepQuery"> | boolean
    createdAt?: DateTimeFilter<"DeepQuery"> | Date | string
    updatedAt?: DateTimeFilter<"DeepQuery"> | Date | string
    lastResult?: JsonNullableFilter<"DeepQuery">
    lastExecutedAt?: DateTimeNullableFilter<"DeepQuery"> | Date | string | null
    executionTime?: IntNullableFilter<"DeepQuery"> | number | null
    ownerId?: IntNullableFilter<"DeepQuery"> | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
    owner?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type DeepQueryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startTable?: SortOrder
    startCondition?: SortOrderInput | SortOrder
    maxDepth?: SortOrder
    includeFields?: SortOrderInput | SortOrder
    excludeFields?: SortOrderInput | SortOrder
    connectionId?: SortOrder
    useCache?: SortOrder
    cacheDuration?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastResult?: SortOrderInput | SortOrder
    lastExecutedAt?: SortOrderInput | SortOrder
    executionTime?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    _count?: DeepQueryCountOrderByAggregateInput
    _avg?: DeepQueryAvgOrderByAggregateInput
    _max?: DeepQueryMaxOrderByAggregateInput
    _min?: DeepQueryMinOrderByAggregateInput
    _sum?: DeepQuerySumOrderByAggregateInput
  }

  export type DeepQueryScalarWhereWithAggregatesInput = {
    AND?: DeepQueryScalarWhereWithAggregatesInput | DeepQueryScalarWhereWithAggregatesInput[]
    OR?: DeepQueryScalarWhereWithAggregatesInput[]
    NOT?: DeepQueryScalarWhereWithAggregatesInput | DeepQueryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DeepQuery"> | number
    name?: StringWithAggregatesFilter<"DeepQuery"> | string
    description?: StringNullableWithAggregatesFilter<"DeepQuery"> | string | null
    startTable?: StringWithAggregatesFilter<"DeepQuery"> | string
    startCondition?: JsonNullableWithAggregatesFilter<"DeepQuery">
    maxDepth?: IntWithAggregatesFilter<"DeepQuery"> | number
    includeFields?: JsonNullableWithAggregatesFilter<"DeepQuery">
    excludeFields?: JsonNullableWithAggregatesFilter<"DeepQuery">
    connectionId?: IntWithAggregatesFilter<"DeepQuery"> | number
    useCache?: BoolWithAggregatesFilter<"DeepQuery"> | boolean
    cacheDuration?: IntNullableWithAggregatesFilter<"DeepQuery"> | number | null
    isActive?: BoolWithAggregatesFilter<"DeepQuery"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DeepQuery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeepQuery"> | Date | string
    lastResult?: JsonNullableWithAggregatesFilter<"DeepQuery">
    lastExecutedAt?: DateTimeNullableWithAggregatesFilter<"DeepQuery"> | Date | string | null
    executionTime?: IntNullableWithAggregatesFilter<"DeepQuery"> | number | null
    ownerId?: IntNullableWithAggregatesFilter<"DeepQuery"> | number | null
  }

  export type QueryCacheWhereInput = {
    AND?: QueryCacheWhereInput | QueryCacheWhereInput[]
    OR?: QueryCacheWhereInput[]
    NOT?: QueryCacheWhereInput | QueryCacheWhereInput[]
    id?: IntFilter<"QueryCache"> | number
    queryHash?: StringFilter<"QueryCache"> | string
    queryData?: JsonFilter<"QueryCache">
    result?: JsonFilter<"QueryCache">
    connectionId?: IntFilter<"QueryCache"> | number
    expiresAt?: DateTimeFilter<"QueryCache"> | Date | string
    createdAt?: DateTimeFilter<"QueryCache"> | Date | string
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
  }

  export type QueryCacheOrderByWithRelationInput = {
    id?: SortOrder
    queryHash?: SortOrder
    queryData?: SortOrder
    result?: SortOrder
    connectionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    connection?: ConnectionOrderByWithRelationInput
  }

  export type QueryCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    queryHash?: string
    AND?: QueryCacheWhereInput | QueryCacheWhereInput[]
    OR?: QueryCacheWhereInput[]
    NOT?: QueryCacheWhereInput | QueryCacheWhereInput[]
    queryData?: JsonFilter<"QueryCache">
    result?: JsonFilter<"QueryCache">
    connectionId?: IntFilter<"QueryCache"> | number
    expiresAt?: DateTimeFilter<"QueryCache"> | Date | string
    createdAt?: DateTimeFilter<"QueryCache"> | Date | string
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
  }, "id" | "queryHash">

  export type QueryCacheOrderByWithAggregationInput = {
    id?: SortOrder
    queryHash?: SortOrder
    queryData?: SortOrder
    result?: SortOrder
    connectionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: QueryCacheCountOrderByAggregateInput
    _avg?: QueryCacheAvgOrderByAggregateInput
    _max?: QueryCacheMaxOrderByAggregateInput
    _min?: QueryCacheMinOrderByAggregateInput
    _sum?: QueryCacheSumOrderByAggregateInput
  }

  export type QueryCacheScalarWhereWithAggregatesInput = {
    AND?: QueryCacheScalarWhereWithAggregatesInput | QueryCacheScalarWhereWithAggregatesInput[]
    OR?: QueryCacheScalarWhereWithAggregatesInput[]
    NOT?: QueryCacheScalarWhereWithAggregatesInput | QueryCacheScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QueryCache"> | number
    queryHash?: StringWithAggregatesFilter<"QueryCache"> | string
    queryData?: JsonWithAggregatesFilter<"QueryCache">
    result?: JsonWithAggregatesFilter<"QueryCache">
    connectionId?: IntWithAggregatesFilter<"QueryCache"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"QueryCache"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"QueryCache"> | Date | string
  }

  export type ColumnProfileWhereInput = {
    AND?: ColumnProfileWhereInput | ColumnProfileWhereInput[]
    OR?: ColumnProfileWhereInput[]
    NOT?: ColumnProfileWhereInput | ColumnProfileWhereInput[]
    id?: IntFilter<"ColumnProfile"> | number
    connectionId?: IntFilter<"ColumnProfile"> | number
    tableName?: StringFilter<"ColumnProfile"> | string
    columnName?: StringFilter<"ColumnProfile"> | string
    distinctCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    totalCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    min?: StringNullableFilter<"ColumnProfile"> | string | null
    max?: StringNullableFilter<"ColumnProfile"> | string | null
    nullCount?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
    sampleValues?: JsonFilter<"ColumnProfile">
    lastUpdated?: DateTimeFilter<"ColumnProfile"> | Date | string
    strategy?: StringFilter<"ColumnProfile"> | string
    rowEstimate?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
  }

  export type ColumnProfileOrderByWithRelationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    nullCount?: SortOrderInput | SortOrder
    sampleValues?: SortOrder
    lastUpdated?: SortOrder
    strategy?: SortOrder
    rowEstimate?: SortOrderInput | SortOrder
    connection?: ConnectionOrderByWithRelationInput
  }

  export type ColumnProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    connectionId_tableName_columnName?: ColumnProfileConnectionIdTableNameColumnNameCompoundUniqueInput
    AND?: ColumnProfileWhereInput | ColumnProfileWhereInput[]
    OR?: ColumnProfileWhereInput[]
    NOT?: ColumnProfileWhereInput | ColumnProfileWhereInput[]
    connectionId?: IntFilter<"ColumnProfile"> | number
    tableName?: StringFilter<"ColumnProfile"> | string
    columnName?: StringFilter<"ColumnProfile"> | string
    distinctCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    totalCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    min?: StringNullableFilter<"ColumnProfile"> | string | null
    max?: StringNullableFilter<"ColumnProfile"> | string | null
    nullCount?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
    sampleValues?: JsonFilter<"ColumnProfile">
    lastUpdated?: DateTimeFilter<"ColumnProfile"> | Date | string
    strategy?: StringFilter<"ColumnProfile"> | string
    rowEstimate?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
    connection?: XOR<ConnectionRelationFilter, ConnectionWhereInput>
  }, "id" | "connectionId_tableName_columnName">

  export type ColumnProfileOrderByWithAggregationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    min?: SortOrderInput | SortOrder
    max?: SortOrderInput | SortOrder
    nullCount?: SortOrderInput | SortOrder
    sampleValues?: SortOrder
    lastUpdated?: SortOrder
    strategy?: SortOrder
    rowEstimate?: SortOrderInput | SortOrder
    _count?: ColumnProfileCountOrderByAggregateInput
    _avg?: ColumnProfileAvgOrderByAggregateInput
    _max?: ColumnProfileMaxOrderByAggregateInput
    _min?: ColumnProfileMinOrderByAggregateInput
    _sum?: ColumnProfileSumOrderByAggregateInput
  }

  export type ColumnProfileScalarWhereWithAggregatesInput = {
    AND?: ColumnProfileScalarWhereWithAggregatesInput | ColumnProfileScalarWhereWithAggregatesInput[]
    OR?: ColumnProfileScalarWhereWithAggregatesInput[]
    NOT?: ColumnProfileScalarWhereWithAggregatesInput | ColumnProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ColumnProfile"> | number
    connectionId?: IntWithAggregatesFilter<"ColumnProfile"> | number
    tableName?: StringWithAggregatesFilter<"ColumnProfile"> | string
    columnName?: StringWithAggregatesFilter<"ColumnProfile"> | string
    distinctCount?: BigIntWithAggregatesFilter<"ColumnProfile"> | bigint | number
    totalCount?: BigIntWithAggregatesFilter<"ColumnProfile"> | bigint | number
    min?: StringNullableWithAggregatesFilter<"ColumnProfile"> | string | null
    max?: StringNullableWithAggregatesFilter<"ColumnProfile"> | string | null
    nullCount?: BigIntNullableWithAggregatesFilter<"ColumnProfile"> | bigint | number | null
    sampleValues?: JsonWithAggregatesFilter<"ColumnProfile">
    lastUpdated?: DateTimeWithAggregatesFilter<"ColumnProfile"> | Date | string
    strategy?: StringWithAggregatesFilter<"ColumnProfile"> | string
    rowEstimate?: BigIntNullableWithAggregatesFilter<"ColumnProfile"> | bigint | number | null
  }

  export type UserCreateInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionCreateNestedManyWithoutOwnerInput
    canvases?: CanvasCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionUncheckedCreateNestedManyWithoutOwnerInput
    canvases?: CanvasUncheckedCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUncheckedUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUncheckedUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionCreateInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionCreateManyInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type ConnectionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CanvasCreateInput = {
    name: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: ConnectionCreateNestedOneWithoutCanvasesInput
    owner?: UserCreateNestedOneWithoutCanvasesInput
  }

  export type CanvasUncheckedCreateInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type CanvasUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneWithoutCanvasesNestedInput
    owner?: UserUpdateOneWithoutCanvasesNestedInput
  }

  export type CanvasUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CanvasCreateManyInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type CanvasUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipCreateInput = {
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutTableRelationshipsInput
    patternRule?: PatternRuleCreateNestedOneWithoutTableRelationshipsInput
    owner?: UserCreateNestedOneWithoutTableRelationshipsInput
  }

  export type TableRelationshipUncheckedCreateInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
    ownerId?: number | null
  }

  export type TableRelationshipUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutTableRelationshipsNestedInput
    patternRule?: PatternRuleUpdateOneWithoutTableRelationshipsNestedInput
    owner?: UserUpdateOneWithoutTableRelationshipsNestedInput
  }

  export type TableRelationshipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipCreateManyInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
    ownerId?: number | null
  }

  export type TableRelationshipUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableRelationshipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatternRuleCreateInput = {
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: ConnectionCreateNestedOneWithoutPatternRulesInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutPatternRuleInput
    owner?: UserCreateNestedOneWithoutPatternRulesInput
  }

  export type PatternRuleUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutPatternRuleInput
  }

  export type PatternRuleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneWithoutPatternRulesNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutPatternRuleNestedInput
    owner?: UserUpdateOneWithoutPatternRulesNestedInput
  }

  export type PatternRuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutPatternRuleNestedInput
  }

  export type PatternRuleCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type PatternRuleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatternRuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryCreateInput = {
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    connection: ConnectionCreateNestedOneWithoutDeepQueriesInput
    owner?: UserCreateNestedOneWithoutDeepQueriesInput
  }

  export type DeepQueryUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId: number
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    ownerId?: number | null
  }

  export type DeepQueryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    connection?: ConnectionUpdateOneRequiredWithoutDeepQueriesNestedInput
    owner?: UserUpdateOneWithoutDeepQueriesNestedInput
  }

  export type DeepQueryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId: number
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    ownerId?: number | null
  }

  export type DeepQueryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type QueryCacheCreateInput = {
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutQueryCachesInput
  }

  export type QueryCacheUncheckedCreateInput = {
    id?: number
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    connectionId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type QueryCacheUpdateInput = {
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutQueryCachesNestedInput
  }

  export type QueryCacheUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryCacheCreateManyInput = {
    id?: number
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    connectionId: number
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type QueryCacheUpdateManyMutationInput = {
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryCacheUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnProfileCreateInput = {
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
    connection: ConnectionCreateNestedOneWithoutColumnProfilesInput
  }

  export type ColumnProfileUncheckedCreateInput = {
    id?: number
    connectionId: number
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
  }

  export type ColumnProfileUpdateInput = {
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    connection?: ConnectionUpdateOneRequiredWithoutColumnProfilesNestedInput
  }

  export type ColumnProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    connectionId?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ColumnProfileCreateManyInput = {
    id?: number
    connectionId: number
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
  }

  export type ColumnProfileUpdateManyMutationInput = {
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ColumnProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    connectionId?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConnectionListRelationFilter = {
    every?: ConnectionWhereInput
    some?: ConnectionWhereInput
    none?: ConnectionWhereInput
  }

  export type CanvasListRelationFilter = {
    every?: CanvasWhereInput
    some?: CanvasWhereInput
    none?: CanvasWhereInput
  }

  export type TableRelationshipListRelationFilter = {
    every?: TableRelationshipWhereInput
    some?: TableRelationshipWhereInput
    none?: TableRelationshipWhereInput
  }

  export type PatternRuleListRelationFilter = {
    every?: PatternRuleWhereInput
    some?: PatternRuleWhereInput
    none?: PatternRuleWhereInput
  }

  export type DeepQueryListRelationFilter = {
    every?: DeepQueryWhereInput
    some?: DeepQueryWhereInput
    none?: DeepQueryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CanvasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableRelationshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatternRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeepQueryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type QueryCacheListRelationFilter = {
    every?: QueryCacheWhereInput
    some?: QueryCacheWhereInput
    none?: QueryCacheWhereInput
  }

  export type ColumnProfileListRelationFilter = {
    every?: ColumnProfileWhereInput
    some?: ColumnProfileWhereInput
    none?: ColumnProfileWhereInput
  }

  export type QueryCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColumnProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    host?: SortOrder
    port?: SortOrder
    user?: SortOrder
    password?: SortOrder
    database?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type ConnectionAvgOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
    ownerId?: SortOrder
  }

  export type ConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    host?: SortOrder
    port?: SortOrder
    user?: SortOrder
    password?: SortOrder
    database?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type ConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    host?: SortOrder
    port?: SortOrder
    user?: SortOrder
    password?: SortOrder
    database?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type ConnectionSumOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
    ownerId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConnectionNullableRelationFilter = {
    is?: ConnectionWhereInput | null
    isNot?: ConnectionWhereInput | null
  }

  export type CanvasCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    data?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type CanvasAvgOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    ownerId?: SortOrder
  }

  export type CanvasMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type CanvasMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type CanvasSumOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    ownerId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumTableRelationshipTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TableRelationshipType | EnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTableRelationshipTypeFilter<$PrismaModel> | $Enums.TableRelationshipType
  }

  export type EnumDetectionMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.DetectionMethod | EnumDetectionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumDetectionMethodFilter<$PrismaModel> | $Enums.DetectionMethod
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ConnectionRelationFilter = {
    is?: ConnectionWhereInput
    isNot?: ConnectionWhereInput
  }

  export type PatternRuleNullableRelationFilter = {
    is?: PatternRuleWhereInput | null
    isNot?: PatternRuleWhereInput | null
  }

  export type TableRelationshipConnectionIdSourceTableSourceColumnTargetTableTargetColumnCompoundUniqueInput = {
    connectionId: number
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
  }

  export type TableRelationshipCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourceTable?: SortOrder
    sourceColumn?: SortOrder
    targetTable?: SortOrder
    targetColumn?: SortOrder
    relationshipType?: SortOrder
    detectionMethod?: SortOrder
    confidence?: SortOrder
    constraintName?: SortOrder
    connectionId?: SortOrder
    isActive?: SortOrder
    isCustom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patternRuleId?: SortOrder
    ownerId?: SortOrder
  }

  export type TableRelationshipAvgOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    connectionId?: SortOrder
    patternRuleId?: SortOrder
    ownerId?: SortOrder
  }

  export type TableRelationshipMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourceTable?: SortOrder
    sourceColumn?: SortOrder
    targetTable?: SortOrder
    targetColumn?: SortOrder
    relationshipType?: SortOrder
    detectionMethod?: SortOrder
    confidence?: SortOrder
    constraintName?: SortOrder
    connectionId?: SortOrder
    isActive?: SortOrder
    isCustom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patternRuleId?: SortOrder
    ownerId?: SortOrder
  }

  export type TableRelationshipMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourceTable?: SortOrder
    sourceColumn?: SortOrder
    targetTable?: SortOrder
    targetColumn?: SortOrder
    relationshipType?: SortOrder
    detectionMethod?: SortOrder
    confidence?: SortOrder
    constraintName?: SortOrder
    connectionId?: SortOrder
    isActive?: SortOrder
    isCustom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patternRuleId?: SortOrder
    ownerId?: SortOrder
  }

  export type TableRelationshipSumOrderByAggregateInput = {
    id?: SortOrder
    confidence?: SortOrder
    connectionId?: SortOrder
    patternRuleId?: SortOrder
    ownerId?: SortOrder
  }

  export type EnumTableRelationshipTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TableRelationshipType | EnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTableRelationshipTypeWithAggregatesFilter<$PrismaModel> | $Enums.TableRelationshipType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTableRelationshipTypeFilter<$PrismaModel>
    _max?: NestedEnumTableRelationshipTypeFilter<$PrismaModel>
  }

  export type EnumDetectionMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DetectionMethod | EnumDetectionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumDetectionMethodWithAggregatesFilter<$PrismaModel> | $Enums.DetectionMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDetectionMethodFilter<$PrismaModel>
    _max?: NestedEnumDetectionMethodFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PatternRuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourcePattern?: SortOrder
    targetPattern?: SortOrder
    relationshipType?: SortOrder
    priority?: SortOrder
    isEnabled?: SortOrder
    minConfidence?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type PatternRuleAvgOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
    minConfidence?: SortOrder
    connectionId?: SortOrder
    ownerId?: SortOrder
  }

  export type PatternRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourcePattern?: SortOrder
    targetPattern?: SortOrder
    relationshipType?: SortOrder
    priority?: SortOrder
    isEnabled?: SortOrder
    minConfidence?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type PatternRuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sourcePattern?: SortOrder
    targetPattern?: SortOrder
    relationshipType?: SortOrder
    priority?: SortOrder
    isEnabled?: SortOrder
    minConfidence?: SortOrder
    connectionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type PatternRuleSumOrderByAggregateInput = {
    id?: SortOrder
    priority?: SortOrder
    minConfidence?: SortOrder
    connectionId?: SortOrder
    ownerId?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DeepQueryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startTable?: SortOrder
    startCondition?: SortOrder
    maxDepth?: SortOrder
    includeFields?: SortOrder
    excludeFields?: SortOrder
    connectionId?: SortOrder
    useCache?: SortOrder
    cacheDuration?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastResult?: SortOrder
    lastExecutedAt?: SortOrder
    executionTime?: SortOrder
    ownerId?: SortOrder
  }

  export type DeepQueryAvgOrderByAggregateInput = {
    id?: SortOrder
    maxDepth?: SortOrder
    connectionId?: SortOrder
    cacheDuration?: SortOrder
    executionTime?: SortOrder
    ownerId?: SortOrder
  }

  export type DeepQueryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startTable?: SortOrder
    maxDepth?: SortOrder
    connectionId?: SortOrder
    useCache?: SortOrder
    cacheDuration?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastExecutedAt?: SortOrder
    executionTime?: SortOrder
    ownerId?: SortOrder
  }

  export type DeepQueryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startTable?: SortOrder
    maxDepth?: SortOrder
    connectionId?: SortOrder
    useCache?: SortOrder
    cacheDuration?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastExecutedAt?: SortOrder
    executionTime?: SortOrder
    ownerId?: SortOrder
  }

  export type DeepQuerySumOrderByAggregateInput = {
    id?: SortOrder
    maxDepth?: SortOrder
    connectionId?: SortOrder
    cacheDuration?: SortOrder
    executionTime?: SortOrder
    ownerId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type QueryCacheCountOrderByAggregateInput = {
    id?: SortOrder
    queryHash?: SortOrder
    queryData?: SortOrder
    result?: SortOrder
    connectionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryCacheAvgOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
  }

  export type QueryCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    queryHash?: SortOrder
    connectionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryCacheMinOrderByAggregateInput = {
    id?: SortOrder
    queryHash?: SortOrder
    connectionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryCacheSumOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type ColumnProfileConnectionIdTableNameColumnNameCompoundUniqueInput = {
    connectionId: number
    tableName: string
    columnName: string
  }

  export type ColumnProfileCountOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    min?: SortOrder
    max?: SortOrder
    nullCount?: SortOrder
    sampleValues?: SortOrder
    lastUpdated?: SortOrder
    strategy?: SortOrder
    rowEstimate?: SortOrder
  }

  export type ColumnProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    nullCount?: SortOrder
    rowEstimate?: SortOrder
  }

  export type ColumnProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    min?: SortOrder
    max?: SortOrder
    nullCount?: SortOrder
    lastUpdated?: SortOrder
    strategy?: SortOrder
    rowEstimate?: SortOrder
  }

  export type ColumnProfileMinOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    min?: SortOrder
    max?: SortOrder
    nullCount?: SortOrder
    lastUpdated?: SortOrder
    strategy?: SortOrder
    rowEstimate?: SortOrder
  }

  export type ColumnProfileSumOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    distinctCount?: SortOrder
    totalCount?: SortOrder
    nullCount?: SortOrder
    rowEstimate?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ConnectionCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput> | ConnectionCreateWithoutOwnerInput[] | ConnectionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOwnerInput | ConnectionCreateOrConnectWithoutOwnerInput[]
    createMany?: ConnectionCreateManyOwnerInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type CanvasCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput> | CanvasCreateWithoutOwnerInput[] | CanvasUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutOwnerInput | CanvasCreateOrConnectWithoutOwnerInput[]
    createMany?: CanvasCreateManyOwnerInputEnvelope
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
  }

  export type TableRelationshipCreateNestedManyWithoutOwnerInput = {
    create?: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput> | TableRelationshipCreateWithoutOwnerInput[] | TableRelationshipUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutOwnerInput | TableRelationshipCreateOrConnectWithoutOwnerInput[]
    createMany?: TableRelationshipCreateManyOwnerInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type PatternRuleCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput> | PatternRuleCreateWithoutOwnerInput[] | PatternRuleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutOwnerInput | PatternRuleCreateOrConnectWithoutOwnerInput[]
    createMany?: PatternRuleCreateManyOwnerInputEnvelope
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
  }

  export type DeepQueryCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput> | DeepQueryCreateWithoutOwnerInput[] | DeepQueryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutOwnerInput | DeepQueryCreateOrConnectWithoutOwnerInput[]
    createMany?: DeepQueryCreateManyOwnerInputEnvelope
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
  }

  export type ConnectionUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput> | ConnectionCreateWithoutOwnerInput[] | ConnectionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOwnerInput | ConnectionCreateOrConnectWithoutOwnerInput[]
    createMany?: ConnectionCreateManyOwnerInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type CanvasUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput> | CanvasCreateWithoutOwnerInput[] | CanvasUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutOwnerInput | CanvasCreateOrConnectWithoutOwnerInput[]
    createMany?: CanvasCreateManyOwnerInputEnvelope
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
  }

  export type TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput> | TableRelationshipCreateWithoutOwnerInput[] | TableRelationshipUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutOwnerInput | TableRelationshipCreateOrConnectWithoutOwnerInput[]
    createMany?: TableRelationshipCreateManyOwnerInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type PatternRuleUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput> | PatternRuleCreateWithoutOwnerInput[] | PatternRuleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutOwnerInput | PatternRuleCreateOrConnectWithoutOwnerInput[]
    createMany?: PatternRuleCreateManyOwnerInputEnvelope
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
  }

  export type DeepQueryUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput> | DeepQueryCreateWithoutOwnerInput[] | DeepQueryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutOwnerInput | DeepQueryCreateOrConnectWithoutOwnerInput[]
    createMany?: DeepQueryCreateManyOwnerInputEnvelope
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConnectionUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput> | ConnectionCreateWithoutOwnerInput[] | ConnectionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOwnerInput | ConnectionCreateOrConnectWithoutOwnerInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutOwnerInput | ConnectionUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ConnectionCreateManyOwnerInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutOwnerInput | ConnectionUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutOwnerInput | ConnectionUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type CanvasUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput> | CanvasCreateWithoutOwnerInput[] | CanvasUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutOwnerInput | CanvasCreateOrConnectWithoutOwnerInput[]
    upsert?: CanvasUpsertWithWhereUniqueWithoutOwnerInput | CanvasUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CanvasCreateManyOwnerInputEnvelope
    set?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    disconnect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    delete?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    update?: CanvasUpdateWithWhereUniqueWithoutOwnerInput | CanvasUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CanvasUpdateManyWithWhereWithoutOwnerInput | CanvasUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
  }

  export type TableRelationshipUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput> | TableRelationshipCreateWithoutOwnerInput[] | TableRelationshipUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutOwnerInput | TableRelationshipCreateOrConnectWithoutOwnerInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutOwnerInput | TableRelationshipUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: TableRelationshipCreateManyOwnerInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutOwnerInput | TableRelationshipUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutOwnerInput | TableRelationshipUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type PatternRuleUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput> | PatternRuleCreateWithoutOwnerInput[] | PatternRuleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutOwnerInput | PatternRuleCreateOrConnectWithoutOwnerInput[]
    upsert?: PatternRuleUpsertWithWhereUniqueWithoutOwnerInput | PatternRuleUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PatternRuleCreateManyOwnerInputEnvelope
    set?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    disconnect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    delete?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    update?: PatternRuleUpdateWithWhereUniqueWithoutOwnerInput | PatternRuleUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PatternRuleUpdateManyWithWhereWithoutOwnerInput | PatternRuleUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
  }

  export type DeepQueryUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput> | DeepQueryCreateWithoutOwnerInput[] | DeepQueryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutOwnerInput | DeepQueryCreateOrConnectWithoutOwnerInput[]
    upsert?: DeepQueryUpsertWithWhereUniqueWithoutOwnerInput | DeepQueryUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DeepQueryCreateManyOwnerInputEnvelope
    set?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    disconnect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    delete?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    update?: DeepQueryUpdateWithWhereUniqueWithoutOwnerInput | DeepQueryUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DeepQueryUpdateManyWithWhereWithoutOwnerInput | DeepQueryUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConnectionUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput> | ConnectionCreateWithoutOwnerInput[] | ConnectionUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutOwnerInput | ConnectionCreateOrConnectWithoutOwnerInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutOwnerInput | ConnectionUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ConnectionCreateManyOwnerInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutOwnerInput | ConnectionUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutOwnerInput | ConnectionUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type CanvasUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput> | CanvasCreateWithoutOwnerInput[] | CanvasUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutOwnerInput | CanvasCreateOrConnectWithoutOwnerInput[]
    upsert?: CanvasUpsertWithWhereUniqueWithoutOwnerInput | CanvasUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CanvasCreateManyOwnerInputEnvelope
    set?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    disconnect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    delete?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    update?: CanvasUpdateWithWhereUniqueWithoutOwnerInput | CanvasUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CanvasUpdateManyWithWhereWithoutOwnerInput | CanvasUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
  }

  export type TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput> | TableRelationshipCreateWithoutOwnerInput[] | TableRelationshipUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutOwnerInput | TableRelationshipCreateOrConnectWithoutOwnerInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutOwnerInput | TableRelationshipUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: TableRelationshipCreateManyOwnerInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutOwnerInput | TableRelationshipUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutOwnerInput | TableRelationshipUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput> | PatternRuleCreateWithoutOwnerInput[] | PatternRuleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutOwnerInput | PatternRuleCreateOrConnectWithoutOwnerInput[]
    upsert?: PatternRuleUpsertWithWhereUniqueWithoutOwnerInput | PatternRuleUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: PatternRuleCreateManyOwnerInputEnvelope
    set?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    disconnect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    delete?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    update?: PatternRuleUpdateWithWhereUniqueWithoutOwnerInput | PatternRuleUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: PatternRuleUpdateManyWithWhereWithoutOwnerInput | PatternRuleUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
  }

  export type DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput> | DeepQueryCreateWithoutOwnerInput[] | DeepQueryUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutOwnerInput | DeepQueryCreateOrConnectWithoutOwnerInput[]
    upsert?: DeepQueryUpsertWithWhereUniqueWithoutOwnerInput | DeepQueryUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: DeepQueryCreateManyOwnerInputEnvelope
    set?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    disconnect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    delete?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    update?: DeepQueryUpdateWithWhereUniqueWithoutOwnerInput | DeepQueryUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: DeepQueryUpdateManyWithWhereWithoutOwnerInput | DeepQueryUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
  }

  export type CanvasCreateNestedManyWithoutConnectionInput = {
    create?: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput> | CanvasCreateWithoutConnectionInput[] | CanvasUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutConnectionInput | CanvasCreateOrConnectWithoutConnectionInput[]
    createMany?: CanvasCreateManyConnectionInputEnvelope
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type TableRelationshipCreateNestedManyWithoutConnectionInput = {
    create?: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput> | TableRelationshipCreateWithoutConnectionInput[] | TableRelationshipUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutConnectionInput | TableRelationshipCreateOrConnectWithoutConnectionInput[]
    createMany?: TableRelationshipCreateManyConnectionInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type PatternRuleCreateNestedManyWithoutConnectionInput = {
    create?: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput> | PatternRuleCreateWithoutConnectionInput[] | PatternRuleUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutConnectionInput | PatternRuleCreateOrConnectWithoutConnectionInput[]
    createMany?: PatternRuleCreateManyConnectionInputEnvelope
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
  }

  export type DeepQueryCreateNestedManyWithoutConnectionInput = {
    create?: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput> | DeepQueryCreateWithoutConnectionInput[] | DeepQueryUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutConnectionInput | DeepQueryCreateOrConnectWithoutConnectionInput[]
    createMany?: DeepQueryCreateManyConnectionInputEnvelope
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
  }

  export type QueryCacheCreateNestedManyWithoutConnectionInput = {
    create?: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput> | QueryCacheCreateWithoutConnectionInput[] | QueryCacheUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QueryCacheCreateOrConnectWithoutConnectionInput | QueryCacheCreateOrConnectWithoutConnectionInput[]
    createMany?: QueryCacheCreateManyConnectionInputEnvelope
    connect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
  }

  export type ColumnProfileCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput> | ColumnProfileCreateWithoutConnectionInput[] | ColumnProfileUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ColumnProfileCreateOrConnectWithoutConnectionInput | ColumnProfileCreateOrConnectWithoutConnectionInput[]
    createMany?: ColumnProfileCreateManyConnectionInputEnvelope
    connect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
  }

  export type CanvasUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput> | CanvasCreateWithoutConnectionInput[] | CanvasUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutConnectionInput | CanvasCreateOrConnectWithoutConnectionInput[]
    createMany?: CanvasCreateManyConnectionInputEnvelope
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
  }

  export type TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput> | TableRelationshipCreateWithoutConnectionInput[] | TableRelationshipUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutConnectionInput | TableRelationshipCreateOrConnectWithoutConnectionInput[]
    createMany?: TableRelationshipCreateManyConnectionInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type PatternRuleUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput> | PatternRuleCreateWithoutConnectionInput[] | PatternRuleUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutConnectionInput | PatternRuleCreateOrConnectWithoutConnectionInput[]
    createMany?: PatternRuleCreateManyConnectionInputEnvelope
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
  }

  export type DeepQueryUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput> | DeepQueryCreateWithoutConnectionInput[] | DeepQueryUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutConnectionInput | DeepQueryCreateOrConnectWithoutConnectionInput[]
    createMany?: DeepQueryCreateManyConnectionInputEnvelope
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
  }

  export type QueryCacheUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput> | QueryCacheCreateWithoutConnectionInput[] | QueryCacheUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QueryCacheCreateOrConnectWithoutConnectionInput | QueryCacheCreateOrConnectWithoutConnectionInput[]
    createMany?: QueryCacheCreateManyConnectionInputEnvelope
    connect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
  }

  export type ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput> | ColumnProfileCreateWithoutConnectionInput[] | ColumnProfileUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ColumnProfileCreateOrConnectWithoutConnectionInput | ColumnProfileCreateOrConnectWithoutConnectionInput[]
    createMany?: ColumnProfileCreateManyConnectionInputEnvelope
    connect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
  }

  export type CanvasUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput> | CanvasCreateWithoutConnectionInput[] | CanvasUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutConnectionInput | CanvasCreateOrConnectWithoutConnectionInput[]
    upsert?: CanvasUpsertWithWhereUniqueWithoutConnectionInput | CanvasUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: CanvasCreateManyConnectionInputEnvelope
    set?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    disconnect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    delete?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    update?: CanvasUpdateWithWhereUniqueWithoutConnectionInput | CanvasUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: CanvasUpdateManyWithWhereWithoutConnectionInput | CanvasUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
  }

  export type UserUpdateOneWithoutConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    upsert?: UserUpsertWithoutConnectionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConnectionsInput, UserUpdateWithoutConnectionsInput>, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type TableRelationshipUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput> | TableRelationshipCreateWithoutConnectionInput[] | TableRelationshipUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutConnectionInput | TableRelationshipCreateOrConnectWithoutConnectionInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutConnectionInput | TableRelationshipUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: TableRelationshipCreateManyConnectionInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutConnectionInput | TableRelationshipUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutConnectionInput | TableRelationshipUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type PatternRuleUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput> | PatternRuleCreateWithoutConnectionInput[] | PatternRuleUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutConnectionInput | PatternRuleCreateOrConnectWithoutConnectionInput[]
    upsert?: PatternRuleUpsertWithWhereUniqueWithoutConnectionInput | PatternRuleUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: PatternRuleCreateManyConnectionInputEnvelope
    set?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    disconnect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    delete?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    update?: PatternRuleUpdateWithWhereUniqueWithoutConnectionInput | PatternRuleUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: PatternRuleUpdateManyWithWhereWithoutConnectionInput | PatternRuleUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
  }

  export type DeepQueryUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput> | DeepQueryCreateWithoutConnectionInput[] | DeepQueryUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutConnectionInput | DeepQueryCreateOrConnectWithoutConnectionInput[]
    upsert?: DeepQueryUpsertWithWhereUniqueWithoutConnectionInput | DeepQueryUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: DeepQueryCreateManyConnectionInputEnvelope
    set?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    disconnect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    delete?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    update?: DeepQueryUpdateWithWhereUniqueWithoutConnectionInput | DeepQueryUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: DeepQueryUpdateManyWithWhereWithoutConnectionInput | DeepQueryUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
  }

  export type QueryCacheUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput> | QueryCacheCreateWithoutConnectionInput[] | QueryCacheUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QueryCacheCreateOrConnectWithoutConnectionInput | QueryCacheCreateOrConnectWithoutConnectionInput[]
    upsert?: QueryCacheUpsertWithWhereUniqueWithoutConnectionInput | QueryCacheUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: QueryCacheCreateManyConnectionInputEnvelope
    set?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    disconnect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    delete?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    connect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    update?: QueryCacheUpdateWithWhereUniqueWithoutConnectionInput | QueryCacheUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: QueryCacheUpdateManyWithWhereWithoutConnectionInput | QueryCacheUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: QueryCacheScalarWhereInput | QueryCacheScalarWhereInput[]
  }

  export type ColumnProfileUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput> | ColumnProfileCreateWithoutConnectionInput[] | ColumnProfileUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ColumnProfileCreateOrConnectWithoutConnectionInput | ColumnProfileCreateOrConnectWithoutConnectionInput[]
    upsert?: ColumnProfileUpsertWithWhereUniqueWithoutConnectionInput | ColumnProfileUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: ColumnProfileCreateManyConnectionInputEnvelope
    set?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    disconnect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    delete?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    connect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    update?: ColumnProfileUpdateWithWhereUniqueWithoutConnectionInput | ColumnProfileUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: ColumnProfileUpdateManyWithWhereWithoutConnectionInput | ColumnProfileUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: ColumnProfileScalarWhereInput | ColumnProfileScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CanvasUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput> | CanvasCreateWithoutConnectionInput[] | CanvasUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: CanvasCreateOrConnectWithoutConnectionInput | CanvasCreateOrConnectWithoutConnectionInput[]
    upsert?: CanvasUpsertWithWhereUniqueWithoutConnectionInput | CanvasUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: CanvasCreateManyConnectionInputEnvelope
    set?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    disconnect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    delete?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    connect?: CanvasWhereUniqueInput | CanvasWhereUniqueInput[]
    update?: CanvasUpdateWithWhereUniqueWithoutConnectionInput | CanvasUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: CanvasUpdateManyWithWhereWithoutConnectionInput | CanvasUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
  }

  export type TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput> | TableRelationshipCreateWithoutConnectionInput[] | TableRelationshipUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutConnectionInput | TableRelationshipCreateOrConnectWithoutConnectionInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutConnectionInput | TableRelationshipUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: TableRelationshipCreateManyConnectionInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutConnectionInput | TableRelationshipUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutConnectionInput | TableRelationshipUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput> | PatternRuleCreateWithoutConnectionInput[] | PatternRuleUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: PatternRuleCreateOrConnectWithoutConnectionInput | PatternRuleCreateOrConnectWithoutConnectionInput[]
    upsert?: PatternRuleUpsertWithWhereUniqueWithoutConnectionInput | PatternRuleUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: PatternRuleCreateManyConnectionInputEnvelope
    set?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    disconnect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    delete?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    connect?: PatternRuleWhereUniqueInput | PatternRuleWhereUniqueInput[]
    update?: PatternRuleUpdateWithWhereUniqueWithoutConnectionInput | PatternRuleUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: PatternRuleUpdateManyWithWhereWithoutConnectionInput | PatternRuleUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
  }

  export type DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput> | DeepQueryCreateWithoutConnectionInput[] | DeepQueryUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DeepQueryCreateOrConnectWithoutConnectionInput | DeepQueryCreateOrConnectWithoutConnectionInput[]
    upsert?: DeepQueryUpsertWithWhereUniqueWithoutConnectionInput | DeepQueryUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: DeepQueryCreateManyConnectionInputEnvelope
    set?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    disconnect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    delete?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    connect?: DeepQueryWhereUniqueInput | DeepQueryWhereUniqueInput[]
    update?: DeepQueryUpdateWithWhereUniqueWithoutConnectionInput | DeepQueryUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: DeepQueryUpdateManyWithWhereWithoutConnectionInput | DeepQueryUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
  }

  export type QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput> | QueryCacheCreateWithoutConnectionInput[] | QueryCacheUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QueryCacheCreateOrConnectWithoutConnectionInput | QueryCacheCreateOrConnectWithoutConnectionInput[]
    upsert?: QueryCacheUpsertWithWhereUniqueWithoutConnectionInput | QueryCacheUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: QueryCacheCreateManyConnectionInputEnvelope
    set?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    disconnect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    delete?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    connect?: QueryCacheWhereUniqueInput | QueryCacheWhereUniqueInput[]
    update?: QueryCacheUpdateWithWhereUniqueWithoutConnectionInput | QueryCacheUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: QueryCacheUpdateManyWithWhereWithoutConnectionInput | QueryCacheUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: QueryCacheScalarWhereInput | QueryCacheScalarWhereInput[]
  }

  export type ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput> | ColumnProfileCreateWithoutConnectionInput[] | ColumnProfileUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ColumnProfileCreateOrConnectWithoutConnectionInput | ColumnProfileCreateOrConnectWithoutConnectionInput[]
    upsert?: ColumnProfileUpsertWithWhereUniqueWithoutConnectionInput | ColumnProfileUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: ColumnProfileCreateManyConnectionInputEnvelope
    set?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    disconnect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    delete?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    connect?: ColumnProfileWhereUniqueInput | ColumnProfileWhereUniqueInput[]
    update?: ColumnProfileUpdateWithWhereUniqueWithoutConnectionInput | ColumnProfileUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: ColumnProfileUpdateManyWithWhereWithoutConnectionInput | ColumnProfileUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: ColumnProfileScalarWhereInput | ColumnProfileScalarWhereInput[]
  }

  export type ConnectionCreateNestedOneWithoutCanvasesInput = {
    create?: XOR<ConnectionCreateWithoutCanvasesInput, ConnectionUncheckedCreateWithoutCanvasesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutCanvasesInput
    connect?: ConnectionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCanvasesInput = {
    create?: XOR<UserCreateWithoutCanvasesInput, UserUncheckedCreateWithoutCanvasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCanvasesInput
    connect?: UserWhereUniqueInput
  }

  export type ConnectionUpdateOneWithoutCanvasesNestedInput = {
    create?: XOR<ConnectionCreateWithoutCanvasesInput, ConnectionUncheckedCreateWithoutCanvasesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutCanvasesInput
    upsert?: ConnectionUpsertWithoutCanvasesInput
    disconnect?: ConnectionWhereInput | boolean
    delete?: ConnectionWhereInput | boolean
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutCanvasesInput, ConnectionUpdateWithoutCanvasesInput>, ConnectionUncheckedUpdateWithoutCanvasesInput>
  }

  export type UserUpdateOneWithoutCanvasesNestedInput = {
    create?: XOR<UserCreateWithoutCanvasesInput, UserUncheckedCreateWithoutCanvasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCanvasesInput
    upsert?: UserUpsertWithoutCanvasesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCanvasesInput, UserUpdateWithoutCanvasesInput>, UserUncheckedUpdateWithoutCanvasesInput>
  }

  export type ConnectionCreateNestedOneWithoutTableRelationshipsInput = {
    create?: XOR<ConnectionCreateWithoutTableRelationshipsInput, ConnectionUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutTableRelationshipsInput
    connect?: ConnectionWhereUniqueInput
  }

  export type PatternRuleCreateNestedOneWithoutTableRelationshipsInput = {
    create?: XOR<PatternRuleCreateWithoutTableRelationshipsInput, PatternRuleUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: PatternRuleCreateOrConnectWithoutTableRelationshipsInput
    connect?: PatternRuleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTableRelationshipsInput = {
    create?: XOR<UserCreateWithoutTableRelationshipsInput, UserUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTableRelationshipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTableRelationshipTypeFieldUpdateOperationsInput = {
    set?: $Enums.TableRelationshipType
  }

  export type EnumDetectionMethodFieldUpdateOperationsInput = {
    set?: $Enums.DetectionMethod
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConnectionUpdateOneRequiredWithoutTableRelationshipsNestedInput = {
    create?: XOR<ConnectionCreateWithoutTableRelationshipsInput, ConnectionUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutTableRelationshipsInput
    upsert?: ConnectionUpsertWithoutTableRelationshipsInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutTableRelationshipsInput, ConnectionUpdateWithoutTableRelationshipsInput>, ConnectionUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type PatternRuleUpdateOneWithoutTableRelationshipsNestedInput = {
    create?: XOR<PatternRuleCreateWithoutTableRelationshipsInput, PatternRuleUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: PatternRuleCreateOrConnectWithoutTableRelationshipsInput
    upsert?: PatternRuleUpsertWithoutTableRelationshipsInput
    disconnect?: PatternRuleWhereInput | boolean
    delete?: PatternRuleWhereInput | boolean
    connect?: PatternRuleWhereUniqueInput
    update?: XOR<XOR<PatternRuleUpdateToOneWithWhereWithoutTableRelationshipsInput, PatternRuleUpdateWithoutTableRelationshipsInput>, PatternRuleUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type UserUpdateOneWithoutTableRelationshipsNestedInput = {
    create?: XOR<UserCreateWithoutTableRelationshipsInput, UserUncheckedCreateWithoutTableRelationshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTableRelationshipsInput
    upsert?: UserUpsertWithoutTableRelationshipsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTableRelationshipsInput, UserUpdateWithoutTableRelationshipsInput>, UserUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type ConnectionCreateNestedOneWithoutPatternRulesInput = {
    create?: XOR<ConnectionCreateWithoutPatternRulesInput, ConnectionUncheckedCreateWithoutPatternRulesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutPatternRulesInput
    connect?: ConnectionWhereUniqueInput
  }

  export type TableRelationshipCreateNestedManyWithoutPatternRuleInput = {
    create?: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput> | TableRelationshipCreateWithoutPatternRuleInput[] | TableRelationshipUncheckedCreateWithoutPatternRuleInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutPatternRuleInput | TableRelationshipCreateOrConnectWithoutPatternRuleInput[]
    createMany?: TableRelationshipCreateManyPatternRuleInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutPatternRulesInput = {
    create?: XOR<UserCreateWithoutPatternRulesInput, UserUncheckedCreateWithoutPatternRulesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatternRulesInput
    connect?: UserWhereUniqueInput
  }

  export type TableRelationshipUncheckedCreateNestedManyWithoutPatternRuleInput = {
    create?: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput> | TableRelationshipCreateWithoutPatternRuleInput[] | TableRelationshipUncheckedCreateWithoutPatternRuleInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutPatternRuleInput | TableRelationshipCreateOrConnectWithoutPatternRuleInput[]
    createMany?: TableRelationshipCreateManyPatternRuleInputEnvelope
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
  }

  export type ConnectionUpdateOneWithoutPatternRulesNestedInput = {
    create?: XOR<ConnectionCreateWithoutPatternRulesInput, ConnectionUncheckedCreateWithoutPatternRulesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutPatternRulesInput
    upsert?: ConnectionUpsertWithoutPatternRulesInput
    disconnect?: ConnectionWhereInput | boolean
    delete?: ConnectionWhereInput | boolean
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutPatternRulesInput, ConnectionUpdateWithoutPatternRulesInput>, ConnectionUncheckedUpdateWithoutPatternRulesInput>
  }

  export type TableRelationshipUpdateManyWithoutPatternRuleNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput> | TableRelationshipCreateWithoutPatternRuleInput[] | TableRelationshipUncheckedCreateWithoutPatternRuleInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutPatternRuleInput | TableRelationshipCreateOrConnectWithoutPatternRuleInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutPatternRuleInput | TableRelationshipUpsertWithWhereUniqueWithoutPatternRuleInput[]
    createMany?: TableRelationshipCreateManyPatternRuleInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutPatternRuleInput | TableRelationshipUpdateWithWhereUniqueWithoutPatternRuleInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutPatternRuleInput | TableRelationshipUpdateManyWithWhereWithoutPatternRuleInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type UserUpdateOneWithoutPatternRulesNestedInput = {
    create?: XOR<UserCreateWithoutPatternRulesInput, UserUncheckedCreateWithoutPatternRulesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatternRulesInput
    upsert?: UserUpsertWithoutPatternRulesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatternRulesInput, UserUpdateWithoutPatternRulesInput>, UserUncheckedUpdateWithoutPatternRulesInput>
  }

  export type TableRelationshipUncheckedUpdateManyWithoutPatternRuleNestedInput = {
    create?: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput> | TableRelationshipCreateWithoutPatternRuleInput[] | TableRelationshipUncheckedCreateWithoutPatternRuleInput[]
    connectOrCreate?: TableRelationshipCreateOrConnectWithoutPatternRuleInput | TableRelationshipCreateOrConnectWithoutPatternRuleInput[]
    upsert?: TableRelationshipUpsertWithWhereUniqueWithoutPatternRuleInput | TableRelationshipUpsertWithWhereUniqueWithoutPatternRuleInput[]
    createMany?: TableRelationshipCreateManyPatternRuleInputEnvelope
    set?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    disconnect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    delete?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    connect?: TableRelationshipWhereUniqueInput | TableRelationshipWhereUniqueInput[]
    update?: TableRelationshipUpdateWithWhereUniqueWithoutPatternRuleInput | TableRelationshipUpdateWithWhereUniqueWithoutPatternRuleInput[]
    updateMany?: TableRelationshipUpdateManyWithWhereWithoutPatternRuleInput | TableRelationshipUpdateManyWithWhereWithoutPatternRuleInput[]
    deleteMany?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
  }

  export type ConnectionCreateNestedOneWithoutDeepQueriesInput = {
    create?: XOR<ConnectionCreateWithoutDeepQueriesInput, ConnectionUncheckedCreateWithoutDeepQueriesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutDeepQueriesInput
    connect?: ConnectionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDeepQueriesInput = {
    create?: XOR<UserCreateWithoutDeepQueriesInput, UserUncheckedCreateWithoutDeepQueriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeepQueriesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConnectionUpdateOneRequiredWithoutDeepQueriesNestedInput = {
    create?: XOR<ConnectionCreateWithoutDeepQueriesInput, ConnectionUncheckedCreateWithoutDeepQueriesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutDeepQueriesInput
    upsert?: ConnectionUpsertWithoutDeepQueriesInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutDeepQueriesInput, ConnectionUpdateWithoutDeepQueriesInput>, ConnectionUncheckedUpdateWithoutDeepQueriesInput>
  }

  export type UserUpdateOneWithoutDeepQueriesNestedInput = {
    create?: XOR<UserCreateWithoutDeepQueriesInput, UserUncheckedCreateWithoutDeepQueriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeepQueriesInput
    upsert?: UserUpsertWithoutDeepQueriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDeepQueriesInput, UserUpdateWithoutDeepQueriesInput>, UserUncheckedUpdateWithoutDeepQueriesInput>
  }

  export type ConnectionCreateNestedOneWithoutQueryCachesInput = {
    create?: XOR<ConnectionCreateWithoutQueryCachesInput, ConnectionUncheckedCreateWithoutQueryCachesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutQueryCachesInput
    connect?: ConnectionWhereUniqueInput
  }

  export type ConnectionUpdateOneRequiredWithoutQueryCachesNestedInput = {
    create?: XOR<ConnectionCreateWithoutQueryCachesInput, ConnectionUncheckedCreateWithoutQueryCachesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutQueryCachesInput
    upsert?: ConnectionUpsertWithoutQueryCachesInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutQueryCachesInput, ConnectionUpdateWithoutQueryCachesInput>, ConnectionUncheckedUpdateWithoutQueryCachesInput>
  }

  export type ConnectionCreateNestedOneWithoutColumnProfilesInput = {
    create?: XOR<ConnectionCreateWithoutColumnProfilesInput, ConnectionUncheckedCreateWithoutColumnProfilesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutColumnProfilesInput
    connect?: ConnectionWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ConnectionUpdateOneRequiredWithoutColumnProfilesNestedInput = {
    create?: XOR<ConnectionCreateWithoutColumnProfilesInput, ConnectionUncheckedCreateWithoutColumnProfilesInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutColumnProfilesInput
    upsert?: ConnectionUpsertWithoutColumnProfilesInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutColumnProfilesInput, ConnectionUpdateWithoutColumnProfilesInput>, ConnectionUncheckedUpdateWithoutColumnProfilesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTableRelationshipTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TableRelationshipType | EnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTableRelationshipTypeFilter<$PrismaModel> | $Enums.TableRelationshipType
  }

  export type NestedEnumDetectionMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.DetectionMethod | EnumDetectionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumDetectionMethodFilter<$PrismaModel> | $Enums.DetectionMethod
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumTableRelationshipTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TableRelationshipType | EnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TableRelationshipType[] | ListEnumTableRelationshipTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTableRelationshipTypeWithAggregatesFilter<$PrismaModel> | $Enums.TableRelationshipType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTableRelationshipTypeFilter<$PrismaModel>
    _max?: NestedEnumTableRelationshipTypeFilter<$PrismaModel>
  }

  export type NestedEnumDetectionMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DetectionMethod | EnumDetectionMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.DetectionMethod[] | ListEnumDetectionMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumDetectionMethodWithAggregatesFilter<$PrismaModel> | $Enums.DetectionMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDetectionMethodFilter<$PrismaModel>
    _max?: NestedEnumDetectionMethodFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ConnectionCreateWithoutOwnerInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutOwnerInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput>
  }

  export type ConnectionCreateManyOwnerInputEnvelope = {
    data: ConnectionCreateManyOwnerInput | ConnectionCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type CanvasCreateWithoutOwnerInput = {
    name: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: ConnectionCreateNestedOneWithoutCanvasesInput
  }

  export type CanvasUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CanvasCreateOrConnectWithoutOwnerInput = {
    where: CanvasWhereUniqueInput
    create: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput>
  }

  export type CanvasCreateManyOwnerInputEnvelope = {
    data: CanvasCreateManyOwnerInput | CanvasCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type TableRelationshipCreateWithoutOwnerInput = {
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutTableRelationshipsInput
    patternRule?: PatternRuleCreateNestedOneWithoutTableRelationshipsInput
  }

  export type TableRelationshipUncheckedCreateWithoutOwnerInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
  }

  export type TableRelationshipCreateOrConnectWithoutOwnerInput = {
    where: TableRelationshipWhereUniqueInput
    create: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput>
  }

  export type TableRelationshipCreateManyOwnerInputEnvelope = {
    data: TableRelationshipCreateManyOwnerInput | TableRelationshipCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type PatternRuleCreateWithoutOwnerInput = {
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: ConnectionCreateNestedOneWithoutPatternRulesInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutPatternRuleInput
  }

  export type PatternRuleUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutPatternRuleInput
  }

  export type PatternRuleCreateOrConnectWithoutOwnerInput = {
    where: PatternRuleWhereUniqueInput
    create: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput>
  }

  export type PatternRuleCreateManyOwnerInputEnvelope = {
    data: PatternRuleCreateManyOwnerInput | PatternRuleCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type DeepQueryCreateWithoutOwnerInput = {
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    connection: ConnectionCreateNestedOneWithoutDeepQueriesInput
  }

  export type DeepQueryUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId: number
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
  }

  export type DeepQueryCreateOrConnectWithoutOwnerInput = {
    where: DeepQueryWhereUniqueInput
    create: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput>
  }

  export type DeepQueryCreateManyOwnerInputEnvelope = {
    data: DeepQueryCreateManyOwnerInput | DeepQueryCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ConnectionWhereUniqueInput
    update: XOR<ConnectionUpdateWithoutOwnerInput, ConnectionUncheckedUpdateWithoutOwnerInput>
    create: XOR<ConnectionCreateWithoutOwnerInput, ConnectionUncheckedCreateWithoutOwnerInput>
  }

  export type ConnectionUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ConnectionWhereUniqueInput
    data: XOR<ConnectionUpdateWithoutOwnerInput, ConnectionUncheckedUpdateWithoutOwnerInput>
  }

  export type ConnectionUpdateManyWithWhereWithoutOwnerInput = {
    where: ConnectionScalarWhereInput
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ConnectionScalarWhereInput = {
    AND?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    OR?: ConnectionScalarWhereInput[]
    NOT?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    id?: IntFilter<"Connection"> | number
    name?: StringFilter<"Connection"> | string
    type?: StringFilter<"Connection"> | string
    host?: StringFilter<"Connection"> | string
    port?: IntFilter<"Connection"> | number
    user?: StringFilter<"Connection"> | string
    password?: StringFilter<"Connection"> | string
    database?: StringFilter<"Connection"> | string
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    ownerId?: IntNullableFilter<"Connection"> | number | null
  }

  export type CanvasUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CanvasWhereUniqueInput
    update: XOR<CanvasUpdateWithoutOwnerInput, CanvasUncheckedUpdateWithoutOwnerInput>
    create: XOR<CanvasCreateWithoutOwnerInput, CanvasUncheckedCreateWithoutOwnerInput>
  }

  export type CanvasUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CanvasWhereUniqueInput
    data: XOR<CanvasUpdateWithoutOwnerInput, CanvasUncheckedUpdateWithoutOwnerInput>
  }

  export type CanvasUpdateManyWithWhereWithoutOwnerInput = {
    where: CanvasScalarWhereInput
    data: XOR<CanvasUpdateManyMutationInput, CanvasUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CanvasScalarWhereInput = {
    AND?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
    OR?: CanvasScalarWhereInput[]
    NOT?: CanvasScalarWhereInput | CanvasScalarWhereInput[]
    id?: IntFilter<"Canvas"> | number
    name?: StringFilter<"Canvas"> | string
    data?: JsonFilter<"Canvas">
    connectionId?: IntNullableFilter<"Canvas"> | number | null
    createdAt?: DateTimeFilter<"Canvas"> | Date | string
    updatedAt?: DateTimeFilter<"Canvas"> | Date | string
    ownerId?: IntNullableFilter<"Canvas"> | number | null
  }

  export type TableRelationshipUpsertWithWhereUniqueWithoutOwnerInput = {
    where: TableRelationshipWhereUniqueInput
    update: XOR<TableRelationshipUpdateWithoutOwnerInput, TableRelationshipUncheckedUpdateWithoutOwnerInput>
    create: XOR<TableRelationshipCreateWithoutOwnerInput, TableRelationshipUncheckedCreateWithoutOwnerInput>
  }

  export type TableRelationshipUpdateWithWhereUniqueWithoutOwnerInput = {
    where: TableRelationshipWhereUniqueInput
    data: XOR<TableRelationshipUpdateWithoutOwnerInput, TableRelationshipUncheckedUpdateWithoutOwnerInput>
  }

  export type TableRelationshipUpdateManyWithWhereWithoutOwnerInput = {
    where: TableRelationshipScalarWhereInput
    data: XOR<TableRelationshipUpdateManyMutationInput, TableRelationshipUncheckedUpdateManyWithoutOwnerInput>
  }

  export type TableRelationshipScalarWhereInput = {
    AND?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
    OR?: TableRelationshipScalarWhereInput[]
    NOT?: TableRelationshipScalarWhereInput | TableRelationshipScalarWhereInput[]
    id?: IntFilter<"TableRelationship"> | number
    name?: StringNullableFilter<"TableRelationship"> | string | null
    description?: StringNullableFilter<"TableRelationship"> | string | null
    sourceTable?: StringFilter<"TableRelationship"> | string
    sourceColumn?: StringFilter<"TableRelationship"> | string
    targetTable?: StringFilter<"TableRelationship"> | string
    targetColumn?: StringFilter<"TableRelationship"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"TableRelationship"> | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFilter<"TableRelationship"> | $Enums.DetectionMethod
    confidence?: FloatNullableFilter<"TableRelationship"> | number | null
    constraintName?: StringNullableFilter<"TableRelationship"> | string | null
    connectionId?: IntFilter<"TableRelationship"> | number
    isActive?: BoolFilter<"TableRelationship"> | boolean
    isCustom?: BoolFilter<"TableRelationship"> | boolean
    createdAt?: DateTimeFilter<"TableRelationship"> | Date | string
    updatedAt?: DateTimeFilter<"TableRelationship"> | Date | string
    patternRuleId?: IntNullableFilter<"TableRelationship"> | number | null
    ownerId?: IntNullableFilter<"TableRelationship"> | number | null
  }

  export type PatternRuleUpsertWithWhereUniqueWithoutOwnerInput = {
    where: PatternRuleWhereUniqueInput
    update: XOR<PatternRuleUpdateWithoutOwnerInput, PatternRuleUncheckedUpdateWithoutOwnerInput>
    create: XOR<PatternRuleCreateWithoutOwnerInput, PatternRuleUncheckedCreateWithoutOwnerInput>
  }

  export type PatternRuleUpdateWithWhereUniqueWithoutOwnerInput = {
    where: PatternRuleWhereUniqueInput
    data: XOR<PatternRuleUpdateWithoutOwnerInput, PatternRuleUncheckedUpdateWithoutOwnerInput>
  }

  export type PatternRuleUpdateManyWithWhereWithoutOwnerInput = {
    where: PatternRuleScalarWhereInput
    data: XOR<PatternRuleUpdateManyMutationInput, PatternRuleUncheckedUpdateManyWithoutOwnerInput>
  }

  export type PatternRuleScalarWhereInput = {
    AND?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
    OR?: PatternRuleScalarWhereInput[]
    NOT?: PatternRuleScalarWhereInput | PatternRuleScalarWhereInput[]
    id?: IntFilter<"PatternRule"> | number
    name?: StringFilter<"PatternRule"> | string
    description?: StringNullableFilter<"PatternRule"> | string | null
    sourcePattern?: StringFilter<"PatternRule"> | string
    targetPattern?: StringFilter<"PatternRule"> | string
    relationshipType?: EnumTableRelationshipTypeFilter<"PatternRule"> | $Enums.TableRelationshipType
    priority?: IntFilter<"PatternRule"> | number
    isEnabled?: BoolFilter<"PatternRule"> | boolean
    minConfidence?: FloatNullableFilter<"PatternRule"> | number | null
    connectionId?: IntNullableFilter<"PatternRule"> | number | null
    createdAt?: DateTimeFilter<"PatternRule"> | Date | string
    updatedAt?: DateTimeFilter<"PatternRule"> | Date | string
    ownerId?: IntNullableFilter<"PatternRule"> | number | null
  }

  export type DeepQueryUpsertWithWhereUniqueWithoutOwnerInput = {
    where: DeepQueryWhereUniqueInput
    update: XOR<DeepQueryUpdateWithoutOwnerInput, DeepQueryUncheckedUpdateWithoutOwnerInput>
    create: XOR<DeepQueryCreateWithoutOwnerInput, DeepQueryUncheckedCreateWithoutOwnerInput>
  }

  export type DeepQueryUpdateWithWhereUniqueWithoutOwnerInput = {
    where: DeepQueryWhereUniqueInput
    data: XOR<DeepQueryUpdateWithoutOwnerInput, DeepQueryUncheckedUpdateWithoutOwnerInput>
  }

  export type DeepQueryUpdateManyWithWhereWithoutOwnerInput = {
    where: DeepQueryScalarWhereInput
    data: XOR<DeepQueryUpdateManyMutationInput, DeepQueryUncheckedUpdateManyWithoutOwnerInput>
  }

  export type DeepQueryScalarWhereInput = {
    AND?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
    OR?: DeepQueryScalarWhereInput[]
    NOT?: DeepQueryScalarWhereInput | DeepQueryScalarWhereInput[]
    id?: IntFilter<"DeepQuery"> | number
    name?: StringFilter<"DeepQuery"> | string
    description?: StringNullableFilter<"DeepQuery"> | string | null
    startTable?: StringFilter<"DeepQuery"> | string
    startCondition?: JsonNullableFilter<"DeepQuery">
    maxDepth?: IntFilter<"DeepQuery"> | number
    includeFields?: JsonNullableFilter<"DeepQuery">
    excludeFields?: JsonNullableFilter<"DeepQuery">
    connectionId?: IntFilter<"DeepQuery"> | number
    useCache?: BoolFilter<"DeepQuery"> | boolean
    cacheDuration?: IntNullableFilter<"DeepQuery"> | number | null
    isActive?: BoolFilter<"DeepQuery"> | boolean
    createdAt?: DateTimeFilter<"DeepQuery"> | Date | string
    updatedAt?: DateTimeFilter<"DeepQuery"> | Date | string
    lastResult?: JsonNullableFilter<"DeepQuery">
    lastExecutedAt?: DateTimeNullableFilter<"DeepQuery"> | Date | string | null
    executionTime?: IntNullableFilter<"DeepQuery"> | number | null
    ownerId?: IntNullableFilter<"DeepQuery"> | number | null
  }

  export type CanvasCreateWithoutConnectionInput = {
    name: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutCanvasesInput
  }

  export type CanvasUncheckedCreateWithoutConnectionInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type CanvasCreateOrConnectWithoutConnectionInput = {
    where: CanvasWhereUniqueInput
    create: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput>
  }

  export type CanvasCreateManyConnectionInputEnvelope = {
    data: CanvasCreateManyConnectionInput | CanvasCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutConnectionsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutConnectionsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasUncheckedCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
  }

  export type TableRelationshipCreateWithoutConnectionInput = {
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRule?: PatternRuleCreateNestedOneWithoutTableRelationshipsInput
    owner?: UserCreateNestedOneWithoutTableRelationshipsInput
  }

  export type TableRelationshipUncheckedCreateWithoutConnectionInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
    ownerId?: number | null
  }

  export type TableRelationshipCreateOrConnectWithoutConnectionInput = {
    where: TableRelationshipWhereUniqueInput
    create: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput>
  }

  export type TableRelationshipCreateManyConnectionInputEnvelope = {
    data: TableRelationshipCreateManyConnectionInput | TableRelationshipCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type PatternRuleCreateWithoutConnectionInput = {
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tableRelationships?: TableRelationshipCreateNestedManyWithoutPatternRuleInput
    owner?: UserCreateNestedOneWithoutPatternRulesInput
  }

  export type PatternRuleUncheckedCreateWithoutConnectionInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutPatternRuleInput
  }

  export type PatternRuleCreateOrConnectWithoutConnectionInput = {
    where: PatternRuleWhereUniqueInput
    create: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput>
  }

  export type PatternRuleCreateManyConnectionInputEnvelope = {
    data: PatternRuleCreateManyConnectionInput | PatternRuleCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type DeepQueryCreateWithoutConnectionInput = {
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    owner?: UserCreateNestedOneWithoutDeepQueriesInput
  }

  export type DeepQueryUncheckedCreateWithoutConnectionInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    ownerId?: number | null
  }

  export type DeepQueryCreateOrConnectWithoutConnectionInput = {
    where: DeepQueryWhereUniqueInput
    create: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput>
  }

  export type DeepQueryCreateManyConnectionInputEnvelope = {
    data: DeepQueryCreateManyConnectionInput | DeepQueryCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type QueryCacheCreateWithoutConnectionInput = {
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type QueryCacheUncheckedCreateWithoutConnectionInput = {
    id?: number
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type QueryCacheCreateOrConnectWithoutConnectionInput = {
    where: QueryCacheWhereUniqueInput
    create: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput>
  }

  export type QueryCacheCreateManyConnectionInputEnvelope = {
    data: QueryCacheCreateManyConnectionInput | QueryCacheCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type ColumnProfileCreateWithoutConnectionInput = {
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
  }

  export type ColumnProfileUncheckedCreateWithoutConnectionInput = {
    id?: number
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
  }

  export type ColumnProfileCreateOrConnectWithoutConnectionInput = {
    where: ColumnProfileWhereUniqueInput
    create: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput>
  }

  export type ColumnProfileCreateManyConnectionInputEnvelope = {
    data: ColumnProfileCreateManyConnectionInput | ColumnProfileCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type CanvasUpsertWithWhereUniqueWithoutConnectionInput = {
    where: CanvasWhereUniqueInput
    update: XOR<CanvasUpdateWithoutConnectionInput, CanvasUncheckedUpdateWithoutConnectionInput>
    create: XOR<CanvasCreateWithoutConnectionInput, CanvasUncheckedCreateWithoutConnectionInput>
  }

  export type CanvasUpdateWithWhereUniqueWithoutConnectionInput = {
    where: CanvasWhereUniqueInput
    data: XOR<CanvasUpdateWithoutConnectionInput, CanvasUncheckedUpdateWithoutConnectionInput>
  }

  export type CanvasUpdateManyWithWhereWithoutConnectionInput = {
    where: CanvasScalarWhereInput
    data: XOR<CanvasUpdateManyMutationInput, CanvasUncheckedUpdateManyWithoutConnectionInput>
  }

  export type UserUpsertWithoutConnectionsInput = {
    update: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type UserUpdateWithoutConnectionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUncheckedUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type TableRelationshipUpsertWithWhereUniqueWithoutConnectionInput = {
    where: TableRelationshipWhereUniqueInput
    update: XOR<TableRelationshipUpdateWithoutConnectionInput, TableRelationshipUncheckedUpdateWithoutConnectionInput>
    create: XOR<TableRelationshipCreateWithoutConnectionInput, TableRelationshipUncheckedCreateWithoutConnectionInput>
  }

  export type TableRelationshipUpdateWithWhereUniqueWithoutConnectionInput = {
    where: TableRelationshipWhereUniqueInput
    data: XOR<TableRelationshipUpdateWithoutConnectionInput, TableRelationshipUncheckedUpdateWithoutConnectionInput>
  }

  export type TableRelationshipUpdateManyWithWhereWithoutConnectionInput = {
    where: TableRelationshipScalarWhereInput
    data: XOR<TableRelationshipUpdateManyMutationInput, TableRelationshipUncheckedUpdateManyWithoutConnectionInput>
  }

  export type PatternRuleUpsertWithWhereUniqueWithoutConnectionInput = {
    where: PatternRuleWhereUniqueInput
    update: XOR<PatternRuleUpdateWithoutConnectionInput, PatternRuleUncheckedUpdateWithoutConnectionInput>
    create: XOR<PatternRuleCreateWithoutConnectionInput, PatternRuleUncheckedCreateWithoutConnectionInput>
  }

  export type PatternRuleUpdateWithWhereUniqueWithoutConnectionInput = {
    where: PatternRuleWhereUniqueInput
    data: XOR<PatternRuleUpdateWithoutConnectionInput, PatternRuleUncheckedUpdateWithoutConnectionInput>
  }

  export type PatternRuleUpdateManyWithWhereWithoutConnectionInput = {
    where: PatternRuleScalarWhereInput
    data: XOR<PatternRuleUpdateManyMutationInput, PatternRuleUncheckedUpdateManyWithoutConnectionInput>
  }

  export type DeepQueryUpsertWithWhereUniqueWithoutConnectionInput = {
    where: DeepQueryWhereUniqueInput
    update: XOR<DeepQueryUpdateWithoutConnectionInput, DeepQueryUncheckedUpdateWithoutConnectionInput>
    create: XOR<DeepQueryCreateWithoutConnectionInput, DeepQueryUncheckedCreateWithoutConnectionInput>
  }

  export type DeepQueryUpdateWithWhereUniqueWithoutConnectionInput = {
    where: DeepQueryWhereUniqueInput
    data: XOR<DeepQueryUpdateWithoutConnectionInput, DeepQueryUncheckedUpdateWithoutConnectionInput>
  }

  export type DeepQueryUpdateManyWithWhereWithoutConnectionInput = {
    where: DeepQueryScalarWhereInput
    data: XOR<DeepQueryUpdateManyMutationInput, DeepQueryUncheckedUpdateManyWithoutConnectionInput>
  }

  export type QueryCacheUpsertWithWhereUniqueWithoutConnectionInput = {
    where: QueryCacheWhereUniqueInput
    update: XOR<QueryCacheUpdateWithoutConnectionInput, QueryCacheUncheckedUpdateWithoutConnectionInput>
    create: XOR<QueryCacheCreateWithoutConnectionInput, QueryCacheUncheckedCreateWithoutConnectionInput>
  }

  export type QueryCacheUpdateWithWhereUniqueWithoutConnectionInput = {
    where: QueryCacheWhereUniqueInput
    data: XOR<QueryCacheUpdateWithoutConnectionInput, QueryCacheUncheckedUpdateWithoutConnectionInput>
  }

  export type QueryCacheUpdateManyWithWhereWithoutConnectionInput = {
    where: QueryCacheScalarWhereInput
    data: XOR<QueryCacheUpdateManyMutationInput, QueryCacheUncheckedUpdateManyWithoutConnectionInput>
  }

  export type QueryCacheScalarWhereInput = {
    AND?: QueryCacheScalarWhereInput | QueryCacheScalarWhereInput[]
    OR?: QueryCacheScalarWhereInput[]
    NOT?: QueryCacheScalarWhereInput | QueryCacheScalarWhereInput[]
    id?: IntFilter<"QueryCache"> | number
    queryHash?: StringFilter<"QueryCache"> | string
    queryData?: JsonFilter<"QueryCache">
    result?: JsonFilter<"QueryCache">
    connectionId?: IntFilter<"QueryCache"> | number
    expiresAt?: DateTimeFilter<"QueryCache"> | Date | string
    createdAt?: DateTimeFilter<"QueryCache"> | Date | string
  }

  export type ColumnProfileUpsertWithWhereUniqueWithoutConnectionInput = {
    where: ColumnProfileWhereUniqueInput
    update: XOR<ColumnProfileUpdateWithoutConnectionInput, ColumnProfileUncheckedUpdateWithoutConnectionInput>
    create: XOR<ColumnProfileCreateWithoutConnectionInput, ColumnProfileUncheckedCreateWithoutConnectionInput>
  }

  export type ColumnProfileUpdateWithWhereUniqueWithoutConnectionInput = {
    where: ColumnProfileWhereUniqueInput
    data: XOR<ColumnProfileUpdateWithoutConnectionInput, ColumnProfileUncheckedUpdateWithoutConnectionInput>
  }

  export type ColumnProfileUpdateManyWithWhereWithoutConnectionInput = {
    where: ColumnProfileScalarWhereInput
    data: XOR<ColumnProfileUpdateManyMutationInput, ColumnProfileUncheckedUpdateManyWithoutConnectionInput>
  }

  export type ColumnProfileScalarWhereInput = {
    AND?: ColumnProfileScalarWhereInput | ColumnProfileScalarWhereInput[]
    OR?: ColumnProfileScalarWhereInput[]
    NOT?: ColumnProfileScalarWhereInput | ColumnProfileScalarWhereInput[]
    id?: IntFilter<"ColumnProfile"> | number
    connectionId?: IntFilter<"ColumnProfile"> | number
    tableName?: StringFilter<"ColumnProfile"> | string
    columnName?: StringFilter<"ColumnProfile"> | string
    distinctCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    totalCount?: BigIntFilter<"ColumnProfile"> | bigint | number
    min?: StringNullableFilter<"ColumnProfile"> | string | null
    max?: StringNullableFilter<"ColumnProfile"> | string | null
    nullCount?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
    sampleValues?: JsonFilter<"ColumnProfile">
    lastUpdated?: DateTimeFilter<"ColumnProfile"> | Date | string
    strategy?: StringFilter<"ColumnProfile"> | string
    rowEstimate?: BigIntNullableFilter<"ColumnProfile"> | bigint | number | null
  }

  export type ConnectionCreateWithoutCanvasesInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutCanvasesInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutCanvasesInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutCanvasesInput, ConnectionUncheckedCreateWithoutCanvasesInput>
  }

  export type UserCreateWithoutCanvasesInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutCanvasesInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionUncheckedCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutCanvasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCanvasesInput, UserUncheckedCreateWithoutCanvasesInput>
  }

  export type ConnectionUpsertWithoutCanvasesInput = {
    update: XOR<ConnectionUpdateWithoutCanvasesInput, ConnectionUncheckedUpdateWithoutCanvasesInput>
    create: XOR<ConnectionCreateWithoutCanvasesInput, ConnectionUncheckedCreateWithoutCanvasesInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutCanvasesInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutCanvasesInput, ConnectionUncheckedUpdateWithoutCanvasesInput>
  }

  export type ConnectionUpdateWithoutCanvasesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutCanvasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type UserUpsertWithoutCanvasesInput = {
    update: XOR<UserUpdateWithoutCanvasesInput, UserUncheckedUpdateWithoutCanvasesInput>
    create: XOR<UserCreateWithoutCanvasesInput, UserUncheckedCreateWithoutCanvasesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCanvasesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCanvasesInput, UserUncheckedUpdateWithoutCanvasesInput>
  }

  export type UserUpdateWithoutCanvasesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutCanvasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUncheckedUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ConnectionCreateWithoutTableRelationshipsInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutTableRelationshipsInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutTableRelationshipsInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutTableRelationshipsInput, ConnectionUncheckedCreateWithoutTableRelationshipsInput>
  }

  export type PatternRuleCreateWithoutTableRelationshipsInput = {
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: ConnectionCreateNestedOneWithoutPatternRulesInput
    owner?: UserCreateNestedOneWithoutPatternRulesInput
  }

  export type PatternRuleUncheckedCreateWithoutTableRelationshipsInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type PatternRuleCreateOrConnectWithoutTableRelationshipsInput = {
    where: PatternRuleWhereUniqueInput
    create: XOR<PatternRuleCreateWithoutTableRelationshipsInput, PatternRuleUncheckedCreateWithoutTableRelationshipsInput>
  }

  export type UserCreateWithoutTableRelationshipsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionCreateNestedManyWithoutOwnerInput
    canvases?: CanvasCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutTableRelationshipsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionUncheckedCreateNestedManyWithoutOwnerInput
    canvases?: CanvasUncheckedCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutTableRelationshipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTableRelationshipsInput, UserUncheckedCreateWithoutTableRelationshipsInput>
  }

  export type ConnectionUpsertWithoutTableRelationshipsInput = {
    update: XOR<ConnectionUpdateWithoutTableRelationshipsInput, ConnectionUncheckedUpdateWithoutTableRelationshipsInput>
    create: XOR<ConnectionCreateWithoutTableRelationshipsInput, ConnectionUncheckedCreateWithoutTableRelationshipsInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutTableRelationshipsInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutTableRelationshipsInput, ConnectionUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type ConnectionUpdateWithoutTableRelationshipsInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutTableRelationshipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type PatternRuleUpsertWithoutTableRelationshipsInput = {
    update: XOR<PatternRuleUpdateWithoutTableRelationshipsInput, PatternRuleUncheckedUpdateWithoutTableRelationshipsInput>
    create: XOR<PatternRuleCreateWithoutTableRelationshipsInput, PatternRuleUncheckedCreateWithoutTableRelationshipsInput>
    where?: PatternRuleWhereInput
  }

  export type PatternRuleUpdateToOneWithWhereWithoutTableRelationshipsInput = {
    where?: PatternRuleWhereInput
    data: XOR<PatternRuleUpdateWithoutTableRelationshipsInput, PatternRuleUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type PatternRuleUpdateWithoutTableRelationshipsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneWithoutPatternRulesNestedInput
    owner?: UserUpdateOneWithoutPatternRulesNestedInput
  }

  export type PatternRuleUncheckedUpdateWithoutTableRelationshipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserUpsertWithoutTableRelationshipsInput = {
    update: XOR<UserUpdateWithoutTableRelationshipsInput, UserUncheckedUpdateWithoutTableRelationshipsInput>
    create: XOR<UserCreateWithoutTableRelationshipsInput, UserUncheckedCreateWithoutTableRelationshipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTableRelationshipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTableRelationshipsInput, UserUncheckedUpdateWithoutTableRelationshipsInput>
  }

  export type UserUpdateWithoutTableRelationshipsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutTableRelationshipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUncheckedUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUncheckedUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ConnectionCreateWithoutPatternRulesInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutPatternRulesInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutPatternRulesInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutPatternRulesInput, ConnectionUncheckedCreateWithoutPatternRulesInput>
  }

  export type TableRelationshipCreateWithoutPatternRuleInput = {
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutTableRelationshipsInput
    owner?: UserCreateNestedOneWithoutTableRelationshipsInput
  }

  export type TableRelationshipUncheckedCreateWithoutPatternRuleInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type TableRelationshipCreateOrConnectWithoutPatternRuleInput = {
    where: TableRelationshipWhereUniqueInput
    create: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput>
  }

  export type TableRelationshipCreateManyPatternRuleInputEnvelope = {
    data: TableRelationshipCreateManyPatternRuleInput | TableRelationshipCreateManyPatternRuleInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutPatternRulesInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionCreateNestedManyWithoutOwnerInput
    canvases?: CanvasCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutPatternRulesInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionUncheckedCreateNestedManyWithoutOwnerInput
    canvases?: CanvasUncheckedCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutPatternRulesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatternRulesInput, UserUncheckedCreateWithoutPatternRulesInput>
  }

  export type ConnectionUpsertWithoutPatternRulesInput = {
    update: XOR<ConnectionUpdateWithoutPatternRulesInput, ConnectionUncheckedUpdateWithoutPatternRulesInput>
    create: XOR<ConnectionCreateWithoutPatternRulesInput, ConnectionUncheckedCreateWithoutPatternRulesInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutPatternRulesInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutPatternRulesInput, ConnectionUncheckedUpdateWithoutPatternRulesInput>
  }

  export type ConnectionUpdateWithoutPatternRulesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutPatternRulesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type TableRelationshipUpsertWithWhereUniqueWithoutPatternRuleInput = {
    where: TableRelationshipWhereUniqueInput
    update: XOR<TableRelationshipUpdateWithoutPatternRuleInput, TableRelationshipUncheckedUpdateWithoutPatternRuleInput>
    create: XOR<TableRelationshipCreateWithoutPatternRuleInput, TableRelationshipUncheckedCreateWithoutPatternRuleInput>
  }

  export type TableRelationshipUpdateWithWhereUniqueWithoutPatternRuleInput = {
    where: TableRelationshipWhereUniqueInput
    data: XOR<TableRelationshipUpdateWithoutPatternRuleInput, TableRelationshipUncheckedUpdateWithoutPatternRuleInput>
  }

  export type TableRelationshipUpdateManyWithWhereWithoutPatternRuleInput = {
    where: TableRelationshipScalarWhereInput
    data: XOR<TableRelationshipUpdateManyMutationInput, TableRelationshipUncheckedUpdateManyWithoutPatternRuleInput>
  }

  export type UserUpsertWithoutPatternRulesInput = {
    update: XOR<UserUpdateWithoutPatternRulesInput, UserUncheckedUpdateWithoutPatternRulesInput>
    create: XOR<UserCreateWithoutPatternRulesInput, UserUncheckedCreateWithoutPatternRulesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatternRulesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatternRulesInput, UserUncheckedUpdateWithoutPatternRulesInput>
  }

  export type UserUpdateWithoutPatternRulesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutPatternRulesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUncheckedUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUncheckedUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ConnectionCreateWithoutDeepQueriesInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutDeepQueriesInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutDeepQueriesInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutDeepQueriesInput, ConnectionUncheckedCreateWithoutDeepQueriesInput>
  }

  export type UserCreateWithoutDeepQueriesInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionCreateNestedManyWithoutOwnerInput
    canvases?: CanvasCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutDeepQueriesInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: ConnectionUncheckedCreateNestedManyWithoutOwnerInput
    canvases?: CanvasUncheckedCreateNestedManyWithoutOwnerInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutOwnerInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutDeepQueriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDeepQueriesInput, UserUncheckedCreateWithoutDeepQueriesInput>
  }

  export type ConnectionUpsertWithoutDeepQueriesInput = {
    update: XOR<ConnectionUpdateWithoutDeepQueriesInput, ConnectionUncheckedUpdateWithoutDeepQueriesInput>
    create: XOR<ConnectionCreateWithoutDeepQueriesInput, ConnectionUncheckedCreateWithoutDeepQueriesInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutDeepQueriesInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutDeepQueriesInput, ConnectionUncheckedUpdateWithoutDeepQueriesInput>
  }

  export type ConnectionUpdateWithoutDeepQueriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutDeepQueriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type UserUpsertWithoutDeepQueriesInput = {
    update: XOR<UserUpdateWithoutDeepQueriesInput, UserUncheckedUpdateWithoutDeepQueriesInput>
    create: XOR<UserCreateWithoutDeepQueriesInput, UserUncheckedCreateWithoutDeepQueriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDeepQueriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDeepQueriesInput, UserUncheckedUpdateWithoutDeepQueriesInput>
  }

  export type UserUpdateWithoutDeepQueriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutDeepQueriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: ConnectionUncheckedUpdateManyWithoutOwnerNestedInput
    canvases?: CanvasUncheckedUpdateManyWithoutOwnerNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutOwnerNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ConnectionCreateWithoutQueryCachesInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutQueryCachesInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    columnProfiles?: ColumnProfileUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutQueryCachesInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutQueryCachesInput, ConnectionUncheckedCreateWithoutQueryCachesInput>
  }

  export type ConnectionUpsertWithoutQueryCachesInput = {
    update: XOR<ConnectionUpdateWithoutQueryCachesInput, ConnectionUncheckedUpdateWithoutQueryCachesInput>
    create: XOR<ConnectionCreateWithoutQueryCachesInput, ConnectionUncheckedCreateWithoutQueryCachesInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutQueryCachesInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutQueryCachesInput, ConnectionUncheckedUpdateWithoutQueryCachesInput>
  }

  export type ConnectionUpdateWithoutQueryCachesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutQueryCachesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionCreateWithoutColumnProfilesInput = {
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    canvases?: CanvasCreateNestedManyWithoutConnectionInput
    owner?: UserCreateNestedOneWithoutConnectionsInput
    tableRelationships?: TableRelationshipCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutColumnProfilesInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
    canvases?: CanvasUncheckedCreateNestedManyWithoutConnectionInput
    tableRelationships?: TableRelationshipUncheckedCreateNestedManyWithoutConnectionInput
    patternRules?: PatternRuleUncheckedCreateNestedManyWithoutConnectionInput
    deepQueries?: DeepQueryUncheckedCreateNestedManyWithoutConnectionInput
    queryCaches?: QueryCacheUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutColumnProfilesInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutColumnProfilesInput, ConnectionUncheckedCreateWithoutColumnProfilesInput>
  }

  export type ConnectionUpsertWithoutColumnProfilesInput = {
    update: XOR<ConnectionUpdateWithoutColumnProfilesInput, ConnectionUncheckedUpdateWithoutColumnProfilesInput>
    create: XOR<ConnectionCreateWithoutColumnProfilesInput, ConnectionUncheckedCreateWithoutColumnProfilesInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutColumnProfilesInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutColumnProfilesInput, ConnectionUncheckedUpdateWithoutColumnProfilesInput>
  }

  export type ConnectionUpdateWithoutColumnProfilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    owner?: UserUpdateOneWithoutConnectionsNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutColumnProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionCreateManyOwnerInput = {
    id?: number
    name: string
    type: string
    host: string
    port: number
    user: string
    password: string
    database: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CanvasCreateManyOwnerInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TableRelationshipCreateManyOwnerInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
  }

  export type PatternRuleCreateManyOwnerInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    connectionId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeepQueryCreateManyOwnerInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId: number
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
  }

  export type ConnectionUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canvases?: CanvasUncheckedUpdateManyWithoutConnectionNestedInput
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutConnectionNestedInput
    patternRules?: PatternRuleUncheckedUpdateManyWithoutConnectionNestedInput
    deepQueries?: DeepQueryUncheckedUpdateManyWithoutConnectionNestedInput
    queryCaches?: QueryCacheUncheckedUpdateManyWithoutConnectionNestedInput
    columnProfiles?: ColumnProfileUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    database?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneWithoutCanvasesNestedInput
  }

  export type CanvasUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CanvasUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableRelationshipUpdateWithoutOwnerInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutTableRelationshipsNestedInput
    patternRule?: PatternRuleUpdateOneWithoutTableRelationshipsNestedInput
  }

  export type TableRelationshipUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatternRuleUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneWithoutPatternRulesNestedInput
    tableRelationships?: TableRelationshipUpdateManyWithoutPatternRuleNestedInput
  }

  export type PatternRuleUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutPatternRuleNestedInput
  }

  export type PatternRuleUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    connectionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeepQueryUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    connection?: ConnectionUpdateOneRequiredWithoutDeepQueriesNestedInput
  }

  export type DeepQueryUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    connectionId?: IntFieldUpdateOperationsInput | number
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CanvasCreateManyConnectionInput = {
    id?: number
    name: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type TableRelationshipCreateManyConnectionInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patternRuleId?: number | null
    ownerId?: number | null
  }

  export type PatternRuleCreateManyConnectionInput = {
    id?: number
    name: string
    description?: string | null
    sourcePattern: string
    targetPattern: string
    relationshipType: $Enums.TableRelationshipType
    priority?: number
    isEnabled?: boolean
    minConfidence?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type DeepQueryCreateManyConnectionInput = {
    id?: number
    name: string
    description?: string | null
    startTable: string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: boolean
    cacheDuration?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: Date | string | null
    executionTime?: number | null
    ownerId?: number | null
  }

  export type QueryCacheCreateManyConnectionInput = {
    id?: number
    queryHash: string
    queryData: JsonNullValueInput | InputJsonValue
    result: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ColumnProfileCreateManyConnectionInput = {
    id?: number
    tableName: string
    columnName: string
    distinctCount: bigint | number
    totalCount: bigint | number
    min?: string | null
    max?: string | null
    nullCount?: bigint | number | null
    sampleValues: JsonNullValueInput | InputJsonValue
    lastUpdated?: Date | string
    strategy: string
    rowEstimate?: bigint | number | null
  }

  export type CanvasUpdateWithoutConnectionInput = {
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutCanvasesNestedInput
  }

  export type CanvasUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CanvasUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipUpdateWithoutConnectionInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRule?: PatternRuleUpdateOneWithoutTableRelationshipsNestedInput
    owner?: UserUpdateOneWithoutTableRelationshipsNestedInput
  }

  export type TableRelationshipUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patternRuleId?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PatternRuleUpdateWithoutConnectionInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tableRelationships?: TableRelationshipUpdateManyWithoutPatternRuleNestedInput
    owner?: UserUpdateOneWithoutPatternRulesNestedInput
  }

  export type PatternRuleUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
    tableRelationships?: TableRelationshipUncheckedUpdateManyWithoutPatternRuleNestedInput
  }

  export type PatternRuleUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourcePattern?: StringFieldUpdateOperationsInput | string
    targetPattern?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    priority?: IntFieldUpdateOperationsInput | number
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    minConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryUpdateWithoutConnectionInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    owner?: UserUpdateOneWithoutDeepQueriesNestedInput
  }

  export type DeepQueryUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeepQueryUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTable?: StringFieldUpdateOperationsInput | string
    startCondition?: NullableJsonNullValueInput | InputJsonValue
    maxDepth?: IntFieldUpdateOperationsInput | number
    includeFields?: NullableJsonNullValueInput | InputJsonValue
    excludeFields?: NullableJsonNullValueInput | InputJsonValue
    useCache?: BoolFieldUpdateOperationsInput | boolean
    cacheDuration?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastResult?: NullableJsonNullValueInput | InputJsonValue
    lastExecutedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    executionTime?: NullableIntFieldUpdateOperationsInput | number | null
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type QueryCacheUpdateWithoutConnectionInput = {
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryCacheUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryCacheUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    queryHash?: StringFieldUpdateOperationsInput | string
    queryData?: JsonNullValueInput | InputJsonValue
    result?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColumnProfileUpdateWithoutConnectionInput = {
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ColumnProfileUncheckedUpdateWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type ColumnProfileUncheckedUpdateManyWithoutConnectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    distinctCount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalCount?: BigIntFieldUpdateOperationsInput | bigint | number
    min?: NullableStringFieldUpdateOperationsInput | string | null
    max?: NullableStringFieldUpdateOperationsInput | string | null
    nullCount?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    sampleValues?: JsonNullValueInput | InputJsonValue
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StringFieldUpdateOperationsInput | string
    rowEstimate?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type TableRelationshipCreateManyPatternRuleInput = {
    id?: number
    name?: string | null
    description?: string | null
    sourceTable: string
    sourceColumn: string
    targetTable: string
    targetColumn: string
    relationshipType: $Enums.TableRelationshipType
    detectionMethod: $Enums.DetectionMethod
    confidence?: number | null
    constraintName?: string | null
    connectionId: number
    isActive?: boolean
    isCustom?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId?: number | null
  }

  export type TableRelationshipUpdateWithoutPatternRuleInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutTableRelationshipsNestedInput
    owner?: UserUpdateOneWithoutTableRelationshipsNestedInput
  }

  export type TableRelationshipUncheckedUpdateWithoutPatternRuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TableRelationshipUncheckedUpdateManyWithoutPatternRuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceTable?: StringFieldUpdateOperationsInput | string
    sourceColumn?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    relationshipType?: EnumTableRelationshipTypeFieldUpdateOperationsInput | $Enums.TableRelationshipType
    detectionMethod?: EnumDetectionMethodFieldUpdateOperationsInput | $Enums.DetectionMethod
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    constraintName?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isCustom?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectionCountOutputTypeDefaultArgs instead
     */
    export type ConnectionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatternRuleCountOutputTypeDefaultArgs instead
     */
    export type PatternRuleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatternRuleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectionDefaultArgs instead
     */
    export type ConnectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CanvasDefaultArgs instead
     */
    export type CanvasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CanvasDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TableRelationshipDefaultArgs instead
     */
    export type TableRelationshipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TableRelationshipDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatternRuleDefaultArgs instead
     */
    export type PatternRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatternRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeepQueryDefaultArgs instead
     */
    export type DeepQueryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeepQueryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QueryCacheDefaultArgs instead
     */
    export type QueryCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QueryCacheDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ColumnProfileDefaultArgs instead
     */
    export type ColumnProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ColumnProfileDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}