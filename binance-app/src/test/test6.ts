import { Interval } from "../components/condition/SlowKConditionItem";
import { utils } from "../utils/utils";

const testInterval : Interval = Interval['10분'];
console.log(testInterval);
console.log(utils.getEnumIntervalByValue(testInterval));