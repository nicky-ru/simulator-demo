import dotenv from "dotenv";

import {
  Simulator,
  DataPointGenerator,
} from "@nick-iotex/w3bstream-http-client-simulator";

dotenv.config();

const pubId = process.env.PUB_ID || "";
const pubToken = process.env.PUB_TOKEN || "";
const endpoint = process.env.W3BSTREAM_ENDPOINT || "";

const simulator = new Simulator(pubId, pubToken, endpoint);
simulator.init();

type TemperatureDataPoint = {
  temperature: number;
  timestamp: number;
};

const generatorFunction = () => ({
  temperature: DataPointGenerator.randomizer(0, 100),
  timestamp: DataPointGenerator.timestampGenerator(),
});

const dataGenerator = new DataPointGenerator<TemperatureDataPoint>(
  generatorFunction
);

simulator.dataPointGenerator = dataGenerator;

// Power on the simulator with a 5-second interval between data points
simulator.powerOn(5);
