/* eslint-disable no-unused-vars */
import GBA from './gba';
import { Core } from '../core';

const cores: Map<string, Core> = new Map([
	["gba", new GBA()]
]);

export default cores;