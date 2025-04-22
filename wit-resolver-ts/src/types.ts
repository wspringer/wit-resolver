import { z } from "zod";
import {
  TypeSchema,
  HandleSchema,
  FieldSchema,
  FlagSchema,
  CaseSchema,
  EnumCaseSchema,
  TypeDefKindSchema,
  TypeOwnerSchema,
  TypeDefSchema,
  FunctionKindSchema,
  FunctionSchema,
  InterfaceSchema,
  WorldItemSchema,
  WorldSchema,
  PackageSchema,
  ResolvedSchema,
  TypeIdSchema,
  InterfaceIdSchema,
  WorldIdSchema,
  PackageIdSchema,
} from "./schema.js";

// Basic type IDs
export type TypeId = z.infer<typeof TypeIdSchema>;
export type InterfaceId = z.infer<typeof InterfaceIdSchema>;
export type WorldId = z.infer<typeof WorldIdSchema>;
export type PackageId = z.infer<typeof PackageIdSchema>;

// Core types
export type Type = z.infer<typeof TypeSchema>;
export type Handle = z.infer<typeof HandleSchema>;
export type Field = z.infer<typeof FieldSchema>;
export type Flag = z.infer<typeof FlagSchema>;
export type Case = z.infer<typeof CaseSchema>;
export type EnumCase = z.infer<typeof EnumCaseSchema>;
export type TypeDefKind = z.infer<typeof TypeDefKindSchema>;
export type TypeOwner = z.infer<typeof TypeOwnerSchema>;
export type TypeDef = z.infer<typeof TypeDefSchema>;
export type FunctionKind = z.infer<typeof FunctionKindSchema>;
export type Function = z.infer<typeof FunctionSchema>;
export type Interface = z.infer<typeof InterfaceSchema>;
export type WorldItem = z.infer<typeof WorldItemSchema>;
export type World = z.infer<typeof WorldSchema>;
export type Package = z.infer<typeof PackageSchema>;
export type Resolved = z.infer<typeof ResolvedSchema>;
