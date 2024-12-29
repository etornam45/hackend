/**
 * @lastModified 2024-10-10
 * @see https://elysiajs.com/recipe/drizzle.html#utility
 */

import { Kind, type TObject } from '@sinclair/typebox'
import {
    createInsertSchema,
    createSelectSchema,
} from 'drizzle-typebox'

import type { Table } from 'drizzle-orm'
import { BuildSchema } from 'drizzle-typebox/schema.types.internal'



/**
* Spread a Drizzle schema into a plain object
*/
export const spread = <
    T extends TObject | Table,
    Mode extends 'select' | 'insert' | undefined
>(
    schema: T,
    mode?: Mode
) => {
    const newSchema: Record<string, unknown> = {}
    let table

    switch (mode) {
	    case 'insert':
	    case 'select':
	        if (Kind in schema) {
	            table = schema
	            break
	        }

	        table =
	            mode === 'insert'
	                ? createInsertSchema(schema)
	                : createSelectSchema(schema)

	        break

        default:
            if (!(Kind in schema)) throw new Error('Expect a schema')
            table = schema
    }

    for (const key of Object.keys(table.properties))
        newSchema[key] = table.properties[key]

    return newSchema as any
}


/**
* Spread a Drizzle Table into a plain object
*
* If `mode` is 'insert', the schema will be refined for insert
* If `mode` is 'select', the schema will be refined for select
* If `mode` is undefined, the schema will be spread as is, models will need to be refined manually
*/
export const spreads = <
    T extends Record<string, TObject | Table>,
    Mode extends 'select' | 'insert' | undefined
>(
    models: T,
    mode?: Mode
): {
    [K in keyof T]: any
} => {
    const newSchema: Record<string, unknown> = {}
    const keys = Object.keys(models)

    for (const key of keys) newSchema[key] = spread(models[key], mode)

    return newSchema as any
}