export enum Control {
	LeftAnalogUp = 'LEFT_ANALOG_UP',
	LeftAnalogRight = 'LEFT_ANALOG_RIGHT',
	LeftAnalogDown = 'LEFT_ANALOG_DOWN',
	LeftAnalogLeft = 'LEFT_ANALOG_LEFT',
	LeftAnalogPress = 'LEFT_ANALOG_PRESS',
	RightAnalogUp = 'RIGHT_ANALOG_UP',
	RightAnalogRight = 'RIGHT_ANALOG_RIGHT',
	RightAnalogDown = 'RIGHT_ANALOG_DOWN',
	RightAnalogLeft = 'RIGHT_ANALOG_LEFT',
	RightAnalogPress = 'RIGHT_ANALOG_PRESS',
	A = 'A',
	B = 'B',
	X = 'X',
	Y = 'Y',
	LeftTrigger = 'LEFT_TRIGGER',
	LeftShoulder = 'LEFT_BUMPER',
	RightTrigger = 'RIGHT_TRIGGER',
	RightShoulder = 'RIGHT_BUMPER',
	Select = 'SELECT',
	Start = 'START',
	Up = 'DPAD_UP',
	Right = 'DPAD_RIGHT',
	Down = 'DPAD_DOWN',
	Left = 'DPAD_LEFT',
}

export class Core {

	/** The system's abbreviated and full name */
	public name?: {
		short: string;
		long: string;
	};

	/** Supported file extensions (i.e. "gba", "gbc", "gb", etc.) */
	public fileTypes?: string[];

	/** Information about the Git repo */
	public repo?: {
		name: string;
		developer: string;
		logo: string;
		link: string;
	}

	/** A list of <script> dependancies that get added. */
	public dependancies: string[] = []; 
	
	/** The system's aspect ratio as a float, calculated by width/height. (e.g. 4:3 = 1.33) */
	public aspectRatio: number = 1.33; // Defaults to 4:3

	/** The game that is currently being played, gets assigned in the load function. */
	public game?: any;

	/** Accepted controls */
	public controls: Control[] = [];

	/** Setup the emulator enviornment */
	async init(): Promise<void> {
		// Load all dependancies
		await Promise.all(this.dependancies.map(dependancy => {
			return new Promise((resolve, reject) => {
				let script = document.createElement('script');
				script.id = dependancy;
				script.src = dependancy;
				script.onload = resolve;
				document.body.appendChild(script);
			});
		}));

		// Setup basic things
		window.addEventListener('resize',  () => this.resizeCanvas(document.querySelector('canvas.screen'), this.aspectRatio));
		this.resizeCanvas(document.querySelector('canvas.screen'), this.aspectRatio);
	}

	resizeCanvas(canvas: any, aspectRatio: number) {
		let container = (document.querySelector('.screen-container') as HTMLDivElement);
		var containerHeight = container.clientHeight ?? container.offsetHeight ?? 0;
		var containerWidth = container.clientWidth ?? container.offsetWidth ?? 0;
		if (containerHeight > 0 && containerWidth > 0) {
			const width = Math.floor(Math.min(containerHeight * aspectRatio, containerWidth));
			const height = Math.floor(Math.min(containerWidth / aspectRatio, containerHeight));
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			canvas.width = width;
			canvas.height = height;
		}
	}

	/**
	 * Handle the game and the ROM for loading
	 * @param rom A blob representation of the ROM
	 * @param game The game that is being loaded
	 */
	async load(rom: Blob, game: any): Promise<void> {
		// eslint-disable-next-line
		throw 'This core doesn\'t handle loading games.';
	}

	/**
	 * Handle pre-exit stuff, such as saving.
	 */
	async exit(): Promise<void> {
		window.removeEventListener('resize', () => this.resizeCanvas(document.querySelector('canvas.screen'), this.aspectRatio));
	}

	/**
	 * Handle controls
	 * @param controls the recieved controls.
	 */
	async didRecieveInput(controls: object) {
		console.log(controls);
	}
}