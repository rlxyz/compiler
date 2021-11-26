import { Layers } from "../src/layer"
import { LAYER_TYPES } from "../src/constants/layer"

const basePath = process.cwd();
const layerConfigA = { name: "sky" }

const layerOptionsA = {
    "lights": ["iceland.png", "snowy town.png", "winter.png"],
}
const layerConfigB = {
    name: "special_bottom_exclude",
    options: {
        type: LAYER_TYPES.EXCLUSION,
        exclude: layerOptionsA
    }
}
const layerConfigC = {
    name: "special_bottom_combination",
    options: {
        type: LAYER_TYPES.COMBINATION,
        combination: layerOptionsA
    }
}

describe("Layer", () => {
    test('sets layer details correctly', () => {
        const layers = new Layers([layerConfigA], basePath)

        expect(layers.get(0).name).toBe(layerConfigA.name);
        expect(layers.get(0).iterations).toBe(1);
        expect(layers.get(0).occuranceRate).toBe(1);
        expect(layers.get(0).combination).toBe(undefined);
        expect(layers.get(0).exclude).toBe(undefined);
        expect(layers.get(0).type).toBe(LAYER_TYPES.NORMAL);
    });

    test(`sets ${LAYER_TYPES.EXCLUSION} type properly`, () => {
        const layers = new Layers([layerConfigB], basePath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.EXCLUSION);
        expect(layers.get(0).exclude).toBe(layerOptionsA)
    })

    test(`sets ${LAYER_TYPES.COMBINATION} type properly`, () => {
        const layers = new Layers([layerConfigC], basePath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.COMBINATION);
        expect(layers.get(0).combination).toBe(layerOptionsA)
    })
})
