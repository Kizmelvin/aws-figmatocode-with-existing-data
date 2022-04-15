import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProductsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Products {
  readonly id: string;
  readonly title?: string | null;
  readonly image?: string | null;
  readonly price?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Products, ProductsMetaData>);
  static copyOf(source: Products, mutator: (draft: MutableModel<Products, ProductsMetaData>) => MutableModel<Products, ProductsMetaData> | void): Products;
}