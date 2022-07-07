import { ImageFormatConfig, Layers } from "../src"
import { LAYER_TYPES } from "../src/constants/layer"
import fs from 'fs';

jest.mock('fs', () => ({
    existsSync: () => true
}));

const layerPath = process.cwd() + "/test/testLayers";
const layerOptionsA = {
    "lights": ["iceland.png", "snowy town.png", "winter.png"],
}
const layerA = { name: "layerA", traits: [{ name: "some_trait_a", weight: 1 }] }
const layerB = {
    name: "layerB",
    traits: [{ name: "some_trait_a", weight: 1 }],
    options: {
        type: LAYER_TYPES.EXCLUSION,
        exclude: layerOptionsA
    }
}

const layerC = {
    name: "layerC",
    traits: [{ name: "some_trait_a", weight: 1 }],
    options: {
        type: LAYER_TYPES.COMBINATION,
        combination: layerOptionsA
    }
}

const imageFormatConfig: ImageFormatConfig = {
    width: 1,
    height: 1,
    smoothing: false,
}

// todo: 
// 1 - imageFormatConfig invalid
// 2 - layerPath invalid
describe("Layer", () => {
    test('can set overall config correctly', () => {
        const layers = new Layers([layerA], imageFormatConfig, layerPath, true)
        expect(layers.layerPath).toBe(layerPath + "/layers")
        expect(layers.savePath).toBe(layerPath + "/images")
        expect(layers.saveImage).toBe(true)
    });

    test("can set a layer correctly", () => {
        const layers = new Layers([layerA], imageFormatConfig, layerPath, false)
        expect(layers.get(0).name).toBe(layerA.name);
        expect(layers.get(0).iterations).toBe(1);
        expect(layers.get(0).occuranceRate).toBe(1);
        expect(layers.get(0).combination).toBe(undefined);
        expect(layers.get(0).exclude).toBe(undefined);
        expect(layers.get(0).type).toBe(LAYER_TYPES.NORMAL);
    })

    // todo: fix
    // test("will fail if layer config is empty", () => {
    //     expect(new Layers([], imageFormatConfig, layerPath)).toThrowError("configs failed with length 0")
    // })

    test(`sets ${LAYER_TYPES.EXCLUSION} type properly`, () => {
        const layers = new Layers([layerB], imageFormatConfig, layerPath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.EXCLUSION);
        expect(layers.get(0).exclude).toBe(layerOptionsA)
    })

    test(`sets ${LAYER_TYPES.COMBINATION} type properly`, () => {
        const layers = new Layers([layerC], imageFormatConfig, layerPath)
        expect(layers.get(0).type).toBe(LAYER_TYPES.COMBINATION);
        expect(layers.get(0).combination).toBe(layerOptionsA)
    })

    test("can set multiple layer configs", () => {
        const layers = new Layers([layerA, layerB, layerC], imageFormatConfig, layerPath)
        expect(layers.get(0).name).toBe(layerA.name)
        expect(layers.get(1).name).toBe(layerB.name)
        expect(layers.get(2).name).toBe(layerC.name)
    })
})
