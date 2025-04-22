import { z } from "zod";

// Basic type aliases
export const TypeIdSchema = z.number();
export const InterfaceIdSchema = z.number();
export const WorldIdSchema = z.number();
export const PackageIdSchema = z.number();

// Basic types
export const TypeSchema = z.union([
  z.literal("bool"),
  z.literal("u8"),
  z.literal("u16"),
  z.literal("u32"),
  z.literal("u64"),
  z.literal("s8"),
  z.literal("s16"),
  z.literal("s32"),
  z.literal("s64"),
  z.literal("f32"),
  z.literal("f64"),
  z.literal("char"),
  z.literal("string"),
  z.literal("error-context"),
  TypeIdSchema,
]);

export const HandleSchema = z.union([
  z.object({ own: TypeIdSchema }),
  z.object({ borrow: TypeIdSchema }),
]);

export const FieldSchema = z.object({
  name: z.string(),
  type: TypeSchema,
  docs: z.string().optional(),
});

export const FlagSchema = z.object({
  name: z.string(),
  docs: z.string().optional(),
});

export const CaseSchema = z.object({
  name: z.string(),
  type: TypeSchema.optional(),
  docs: z.string().optional(),
});

export const EnumCaseSchema = z.object({
  name: z.string(),
  docs: z.string().optional(),
});

export const TypeDefKindSchema = z.union([
  z.object({ record: z.object({ fields: z.array(FieldSchema) }) }),
  z.literal("resource"),
  z.object({ handle: HandleSchema }),
  z.object({ flags: z.object({ flags: z.array(FlagSchema) }) }),
  z.object({ tuple: z.object({ types: z.array(TypeSchema) }) }),
  z.object({ variant: z.object({ cases: z.array(CaseSchema) }) }),
  z.object({ enum: z.object({ cases: z.array(EnumCaseSchema) }) }),
  z.object({ option: TypeSchema }),
  z.object({
    result: z.object({ ok: TypeSchema.optional(), err: TypeSchema.optional() }),
  }),
  z.object({ list: TypeSchema }),
  z.object({ future: TypeSchema.optional() }),
  z.object({ stream: TypeSchema.optional() }),
  z.object({ type: TypeSchema }),
]);

export const TypeOwnerSchema = z.union([
  z.object({ world: WorldIdSchema }),
  z.object({ interface: InterfaceIdSchema }),
  z.null(),
]);

export const TypeDefSchema = z.object({
  name: z.string().nullable(),
  kind: TypeDefKindSchema,
  owner: TypeOwnerSchema,
  docs: z.string().optional(),
  stability: z.string().optional(),
});

export const FunctionKindSchema = z.union([
  z.literal("freestanding"),
  z.literal("async-freestanding"),
  z.object({ method: TypeIdSchema }),
  z.object({ "async-method": TypeIdSchema }),
  z.object({ static: TypeIdSchema }),
  z.object({ "async-static": TypeIdSchema }),
  z.object({ constructor: TypeIdSchema }),
]);

export const FunctionSchema = z.object({
  name: z.string(),
  kind: FunctionKindSchema,
  params: z.array(
    z.object({
      name: z.string(),
      type: TypeSchema,
    })
  ),
  result: TypeSchema.optional(),
  docs: z.string().optional(),
  stability: z.string().optional(),
});

export const InterfaceSchema = z.object({
  name: z.string().optional(),
  types: z.record(z.string(), TypeIdSchema),
  functions: z.record(z.string(), FunctionSchema),
  docs: z.string().optional(),
  stability: z.string().optional(),
  package: PackageIdSchema.optional(),
});

export const WorldItemSchema = z.union([
  z.object({
    interface: z.object({
      id: InterfaceIdSchema,
      stability: z.string().optional(),
    }),
  }),
  z.object({ function: FunctionSchema }),
  z.object({ type: TypeIdSchema }),
]);

export const WorldSchema = z.object({
  name: z.string(),
  imports: z.record(z.string(), WorldItemSchema),
  exports: z.record(z.string(), WorldItemSchema),
  package: PackageIdSchema.optional(),
  docs: z.string().optional(),
  stability: z.string().optional(),
});

export const PackageSchema = z.object({
  name: z.string(),
  docs: z.string().optional(),
  interfaces: z.record(z.string(), InterfaceIdSchema),
  worlds: z.record(z.string(), WorldIdSchema),
});

export const ResolvedSchema = z.object({
  worlds: z.array(WorldSchema),
  interfaces: z.array(InterfaceSchema),
  types: z.array(TypeDefSchema),
  packages: z.array(PackageSchema),
});
