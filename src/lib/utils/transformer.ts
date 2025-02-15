import type { CombinedDataTransformer } from '@trpc/server'
import { parse, stringify } from 'devalue'

export const transformer: CombinedDataTransformer = {
	input: {
		serialize: (object) => stringify(object),
		deserialize: (object) => parse(object),
	},
	output: {
		serialize: (object) => stringify(object),
		deserialize: (object) => parse(object),
	},
}
