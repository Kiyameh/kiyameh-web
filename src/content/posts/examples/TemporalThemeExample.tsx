import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import s from "./TemporalThemeExample.module.css";
import { Moon, Sun, RotateCcw } from "lucide-react";

interface TouchEventWithStartY extends React.TouchEvent<HTMLDivElement> {
	currentTarget: HTMLDivElement & { startY?: number };
}

const clampValue = (value: number, min: number, max: number): number => {
	if (value > max) return min;
	if (value < min) return max;
	return value;
};

const TimeScroller = ({
	value,
	onChange,
	max,
	min = 0,
	label,
}: {
	value: number;
	onChange: (value: number) => void;
	max: number;
	min?: number;
	label: string;
}) => {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = divRef.current;
		if (!element) return;

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			event.stopPropagation();
			const direction = event.deltaY < 0 ? 1 : -1;
			let newValue = value + direction;
			newValue = clampValue(newValue, min, max);
			onChange(newValue);
		};

		element.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			element.removeEventListener("wheel", handleWheel);
		};
	}, [value, onChange, min, max]);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		e.preventDefault();
		(e.currentTarget as HTMLDivElement & { startY?: number }).startY =
			e.touches[0].clientY;
	};

	const handleTouchMove = (e: TouchEventWithStartY) => {
		e.preventDefault();
		const startY = e.currentTarget.startY;
		if (startY === undefined) return;

		const currentY = e.touches[0].clientY;
		const diff = startY - currentY;

		if (Math.abs(diff) > 20) {
			const direction = diff > 0 ? 1 : -1;
			let newValue = value + direction;
			newValue = clampValue(newValue, min, max);
			onChange(newValue);
			e.currentTarget.startY = currentY;
		}
	};

	const formattedValue = String(value).padStart(2, "0");

	return (
		<div
			ref={divRef}
			className={s.timeInput}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			role="spinbutton"
			aria-label={label}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			style={{ touchAction: "none" }}
		>
			{formattedValue}
		</div>
	);
};

const isNightTime = (date: Date): boolean => {
	const hour = date.getHours();
	return hour < 7 || hour >= 20;
};

function rotationAngle(date: Date): string {
	const totalHours = date.getHours() + date.getMinutes() / 60;
	/*
	 * Velocidad de avance de los astros:
	 * 360deg / 24h = 15deg/h
	 */
	const degrees = totalHours * 15;
	return `${degrees.toFixed(2)}deg`;
}

const formatHourAndMinutes = (date: Date): string => {
	return `${String(date.getHours()).padStart(2, "0")}:${String(
		date.getMinutes(),
	).padStart(2, "0")}`;
};

const TemporalThemeExample = ({ lang }: { lang: "es" | "en" }) => {
	const [currentTime, setCurrentTime] = useState<Date>(new Date());
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	const timeToUse = selectedTime || currentTime;

	useEffect(() => {
		const now = new Date();
		setCurrentTime(now);

		const timer = setInterval(() => {
			// Solo actualiza si no hay una hora seleccionada manualmente
			setSelectedTime((prev) => {
				if (prev === null) {
					return null; // Sigue siendo nulo, pero `currentTime` se actualizará
				}
				return prev; // Mantiene la hora seleccionada
			});
			setCurrentTime(new Date());
		}, 60 * 1000);

		return () => clearInterval(timer);
	}, []);

	const isNight = useMemo(() => isNightTime(timeToUse), [timeToUse]);

	const themeVars = useMemo(() => {
		return isNight
			? ({
					"--rotation-angle": rotationAngle(timeToUse),
					"--bg-color": "#0d2a6160",
					"--text-color": "#fff0c8ff",
				} as React.CSSProperties)
			: ({
					"--rotation-angle": rotationAngle(timeToUse),
					"--bg-color": "#fff0c8ff",
					"--text-color": "#680902ff",
				} as React.CSSProperties);
	}, [isNight, timeToUse]);

	const handleHourChange = useCallback(
		(newHour: number) => {
			// Usamos el updater funcional de `useState`
			setSelectedTime((prevSelectedTime) => {
				// La fecha base es la seleccionada o la actual
				const baseDate = prevSelectedTime || currentTime;
				// Creamos una *nueva* fecha para evitar mutaciones
				const newDate = new Date(baseDate);
				newDate.setHours(newHour);
				newDate.setSeconds(0); // Reseteamos segundos por consistencia
				newDate.setMilliseconds(0);
				return newDate;
			});
		},
		[currentTime], // Solo depende de `currentTime` como fallback
	);

	const handleMinuteChange = useCallback(
		(newMinute: number) => {
			setSelectedTime((prevSelectedTime) => {
				const baseDate = prevSelectedTime || currentTime;
				const newDate = new Date(baseDate);
				newDate.setMinutes(newMinute);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
				return newDate;
			});
		},
		[currentTime],
	);

	const handleReset = () => {
		setSelectedTime(null);
	};

	const currentHour = timeToUse.getHours();
	const currentMinute = timeToUse.getMinutes();
	const isTimeSelected = selectedTime !== null;

	return (
		<div className={s.appThemeContainer} style={themeVars}>
			<div className={s.displayContainer}>
				<p>
					{isTimeSelected
						? lang === "es"
							? "Hora Seleccionada"
							: "Selected Time"
						: lang === "es"
							? "Hora Actual"
							: "Current Time"}
					:
					<br />
					<span className={s.timeDisplay}>
						{formatHourAndMinutes(timeToUse)}
					</span>
				</p>
				<p className={s.dayNightText}>
					{lang === "es" ? (
						<span>
							Hace {isNight ? "una hermosa" : "un bonito"}{" "}
							{isNight ? "noche" : "día"}
						</span>
					) : (
						<span>
							It's {isNight ? "a beautiful" : "a nice"}{" "}
							{isNight ? "night" : "day"}
						</span>
					)}
				</p>
				<div className={s.iconsContainer}>
					<Sun className={s.sun} size={46} />
					<Moon className={s.moon} size={46} />
				</div>
			</div>

			<div className={s.manualTimeSelector}>
				<p>{lang === "es" ? "Maquina del tiempo" : "Time Machine"}</p>
				<div className={s.scrollersContainer}>
					<TimeScroller
						value={currentHour}
						onChange={handleHourChange}
						max={23}
						label={lang === "es" ? "Horas" : "Hours"}
					/>
					<span className={s.separator}>:</span>
					<TimeScroller
						value={currentMinute}
						onChange={handleMinuteChange}
						max={59}
						label={lang === "es" ? "Minutos" : "Minutes"}
					/>
				</div>

				<button
					onClick={handleReset}
					className={s.resetButton}
					disabled={!isTimeSelected}
					title={
						lang === "es" ? "Volver a la hora actual" : "Reset to current time"
					}
				>
					<RotateCcw size={16} />
					Reset
				</button>
			</div>
		</div>
	);
};

export default TemporalThemeExample;
