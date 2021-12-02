import { Layers } from "../src/layer"
import { LAYER_TYPES } from "../src/constants/layer"

const layerPath = process.cwd() + "/test/testLayers";
const layerOptionsA = {
    "lights": ["iceland.png", "snowy town.png", "winter.png"],
}
const layerA = { name: "layerA" }
const layerB = {
    name: "layerB", options: {
        type: LAYER_TYPES.EXCLUSION,
        exclude: layerOptionsA
    }
}
const layerC = {
    name: "layerC", options: {
        type: LAYER_TYPES.COMBINATION,
        combination: layerOptionsA
    }
}

describe("Layer", () => {
    test('sets layer details correctly', () => {
        const layers = new Layers([layerA], layerPath)
        expect(layers.get(0).name).toBe(layerA.name);
        expect(layers.get(0).iterations).toBe(1);
        expect(layers.get(0).occuranceRate).toBe(1);
        expect(layers.get(0).combination).toBe(undefined);
        expect(layers.get(0).exclude).toBe(undefined);
        expect(layers.get(0).type).toBe(LAYER_TYPES.NORMAL);
    });

    test(`sets ${LAYER_TYPES.EXCLUSION} type properly`, () => {
        const layers = new Layers([layerB], layerPath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.EXCLUSION);
        expect(layers.get(0).exclude).toBe(layerOptionsA)
    })

    test(`sets ${LAYER_TYPES.COMBINATION} type properly`, () => {
        const layers = new Layers([layerC], layerPath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.COMBINATION);
        expect(layers.get(0).combination).toBe(layerOptionsA)
    })

    test("can set multiple layer configs", () => {
        const layers = new Layers([layerA, layerB, layerC], layerPath)
        expect(layers.get(0).name).toBe(layerA.name)
        expect(layers.get(1).name).toBe(layerB.name)
        expect(layers.get(2).name).toBe(layerC.name)
    })

    // todo: fix
    // test("fails if invalid layer path", () => {
    //     expect(new Layers([layerA], "some_path")).toThrowError(new Error("layerPath invalid"))
    // })
})
