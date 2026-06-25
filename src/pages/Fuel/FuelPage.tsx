import React, { useState } from "react";
import { Settings, Fuel, Timer, Gauge, Zap, ShieldCog } from "lucide-react";
import { Slider } from "@mantine/core";

const RACE_DURATION_MIN = 0;
const RACE_DURATION_MAX = 75;

const autoFormatLapTime = (value: string) => {
  if (!value) return "";
  
  const digits = value.replace(/\D/g, "");
  
  if (digits.length === 0) return "";
  
  const parts: string[] = [];
  
  parts.push(digits[0]);
  
  if (digits.length >= 2) {
    const seconds = digits.slice(1, 3);
    parts.push(":", seconds);
  }
  
  if (digits.length >= 4) {
    const milliseconds = digits.slice(3, 6);
    parts.push(".", milliseconds);
  }
  
  return parts.join("");
};

const autoFormatFuelPerLap = (value: string) => {
  if (!value) return "";
  
  const digits = value.replace(/\D/g, "");
  
  if (digits.length === 0) return "";
  
  const parts: string[] = [];
  
  // Integer part (first digit)
  parts.push(digits[0]);
  
  // Decimal part (add "." after first digit, then remaining digits)
  if (digits.length >= 2) {
    const decimal = digits.slice(1, 4);
    parts.push(".", decimal);
  }
  
  return parts.join("");
};

const normalizeLapTime = (value: string) => {
  const trimmed = value.trim();
  const match = trimmed.match(/^0*(\d+):([0-5]\d)(?:\.(\d{1,3}))?$/);

  if (!match) {
    return null;
  }

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const milliseconds = (match[3] ?? "000").padEnd(3, "0");
  const totalMinutes = minutes + seconds / 60 + Number(milliseconds) / 60000;

  if (totalMinutes <= 0) {
    return null;
  }

  return {
    normalized: `${minutes}:${match[2]}.${milliseconds}`,
    totalMinutes,
  };
};

const formatSafetyMarginCopy = (safetyMargin: number) => {
  return `Includes +${safetyMargin} safety ${
    safetyMargin === 1 ? "lap" : "laps"
  }`;
};

const SAFETY_MARGIN_OPTIONS = [
  { label: "0 laps", value: "0" },
  { label: "+1 lap", value: "1" },
  { label: "+2 laps", value: "2" },
  { label: "+3 laps", value: "3" },
];

export default function FuelPage() {
  const [inputs, setInputs] = useState({
    raceDuration: RACE_DURATION_MIN.toString(),
    lapTime: "",
    fuelPerLap: "",
    safetyMargin: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "lapTime") {
      const formatted = autoFormatLapTime(value);
      setInputs((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "fuelPerLap") {
      const formatted = autoFormatFuelPerLap(value);
      setInputs((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLapTimeBlur = () => {
    const parsed = normalizeLapTime(inputs.lapTime);

    if (parsed) {
      setInputs((prev) => ({ ...prev, lapTime: parsed.normalized }));
    }
  };

  const duration = parseFloat(inputs.raceDuration) || 0;
  const parsedLapTime = normalizeLapTime(inputs.lapTime);
  const lapTime = parsedLapTime?.totalMinutes ?? 0;
  const fuelPerLap = parseFloat(inputs.fuelPerLap) || 0;
  const safetyMargin = parseInt(inputs.safetyMargin, 10);
  const hasLapTimeInput = inputs.lapTime.trim().length > 0;
  const hasInvalidLapTime = hasLapTimeInput && !parsedLapTime;
  const hasInvalidFuelPrecision = /^\d+(?:\.\d{4,})$/.test(
    inputs.fuelPerLap.trim(),
  );
  const hasInvalidFuelPerLap =
    inputs.fuelPerLap.trim().length > 0 &&
    (fuelPerLap < 0.01 || hasInvalidFuelPrecision);
  const isComplete =
    duration >= RACE_DURATION_MIN &&
    duration <= RACE_DURATION_MAX &&
    lapTime > 0 &&
    fuelPerLap >= 0.01;

  let totalLaps = 0;
  let fuelRequired = 0;
  let recommendedFuel = 0;

  if (isComplete) {
    totalLaps = duration / lapTime;
    fuelRequired = totalLaps * fuelPerLap;
    recommendedFuel = fuelRequired + safetyMargin * fuelPerLap;
  }

  return (
    <div className="relative min-h-full py-8 px-10 flex justify-center overflow-y-auto select-none bg-[#171d2a]">
      <div className="relative z-10 w-full max-w-7xl flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-white">
          Fuel Calculator
          <span className="text-base text-gray-500 font-medium block mt-1">
            Calculate precise fuel requirements from Race Duration
          </span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 bg-[#151b27]/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl p-6 shadow-[0_4px_6px_rgba(0,0,0,0.03)] relative overflow-hidden group w-full hover:border-blue-500/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500/60 via-sky-500/80 to-blue-500/60 opacity-50 group-hover:opacity-120 transition-opacity duration-500" />
            <h2 className="text-xl font-semibold text-gray-100 flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Settings className="w-6 h-6 text-blue-400 group-hover:rotate-90 transition-transform duration-700" />
              </div>
              Race Parameters
            </h2>
            <div className="space-y-8">
              <div className="space-y-2 group/input">
                <label className="text-sm font-medium text-gray-300 flex items-center group-focus-within/input:text-blue-400 transition-colors">
                  <Timer className="w-4 h-4 mr-2 opacity-70" />
                  Race Duration (mins)
                </label>
                <Slider
                  className="text-xs font-medium"
                  value={
                    inputs.raceDuration
                      ? parseFloat(inputs.raceDuration)
                      : RACE_DURATION_MIN
                  }
                  onChange={(value) =>
                    setInputs((prev) => ({
                      ...prev,
                      raceDuration: value.toString(),
                    }))
                  }
                  color="blue"
                  size="lg"
                  min={RACE_DURATION_MIN}
                  max={RACE_DURATION_MAX}
                  labelTransitionProps={{
                    transition: 'slide-up',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                    { value: 75, label: "75" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group/input">
                  <label className="text-sm font-medium text-gray-300 flex items-center group-focus-within/input:text-blue-400 transition-colors">
                    <Gauge className="w-4 h-4 mr-2 opacity-70" />
                    Lap Time
                  </label>
                  <input
                    type="text"
                    name="lapTime"
                    value={inputs.lapTime}
                    onChange={handleChange}
                    onBlur={handleLapTimeBlur}
                    placeholder="Enter lap time"
                    className="w-full bg-[#0d111c]/50 text-white px-4 py-3 rounded-xl border border-zinc-700/80 focus:border-blue-500/50 focus:bg-[#0d111c] transition-all outline-none shadow-inner placeholder:text-neutral-500"
                  />
                  {hasInvalidLapTime && (
                    <span className="text-xs font-semibold text-red-300">
                      Enter lap time as m:ss.SSS or m:ss.
                    </span>
                  )}
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-sm font-medium text-gray-300 flex items-center group-focus-within/input:text-blue-400 transition-colors">
                    <Fuel className="w-4 h-4 mr-2 opacity-70" />
                    Fuel per Lap
                  </label>
                  <input
                    type="text"
                    name="fuelPerLap"
                    value={inputs.fuelPerLap}
                    onChange={handleChange}
                    placeholder="Enter fuel per lap"
                    className="w-full bg-[#0d111c]/50 text-white px-4 py-3 rounded-xl border border-zinc-700/80 focus:border-blue-500/50 focus:bg-[#0d111c] transition-all outline-none shadow-inner placeholder:text-neutral-500"
                  />
                  {hasInvalidFuelPerLap && (
                    <span className="text-xs font-semibold text-red-300">
                      Fuel per Lap must be at least 0.01 L/lap.
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3 group/input">
                <label className="text-sm font-medium text-gray-300 flex items-center group-focus-within/input:text-blue-400 transition-colors">
                  <ShieldCog className="w-4 h-4 mr-2 opacity-70" />
                  Safety Margin
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-medium">
                  {SAFETY_MARGIN_OPTIONS.map((option) => {
                    const isActive = inputs.safetyMargin === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setInputs((prev) => ({
                            ...prev,
                            safetyMargin: option.value,
                          }))
                        }
                        className={`h-10 rounded-xl border px-4 text-sm transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "border-blue-500/50 bg-blue-500/60 text-blue-100 shadow-[0_0_14px_rgba(129,140,248,0.18)]"
                            : "border-zinc-700/80 bg-[#0d111c]/60 text-gray-400 hover:border-blue-500/40 hover:bg-blue-500/20 hover:text-blue-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-[#151b27]/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl p-6 shadow-[0_4px_6px_rgba(0,0,0,0.03)] relative overflow-hidden group w-full hover:border-blue-500/20">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              Calculation Results
            </h2>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center py-1">
                <p className={`text-base font-medium tracking-wide ${duration ? 'text-gray-400' : 'text-gray-500'}`}>
                  Race Duration
                </p>
                <span className={`text-lg font-semibold ${duration ? 'text-gray-200' : 'text-gray-400'}`}>
                  {duration}{" "}
                  <span className={`text-base font-medium ${duration ? 'text-gray-300' : 'text-gray-500'}`}>
                    mins
                  </span>
                </span>
              </div>
              <hr className="border-zinc-700/30" />
              <div className="flex justify-between items-center py-1">
                <p className={`text-base font-medium tracking-wide ${parsedLapTime?.normalized ? 'text-gray-400' : 'text-gray-500'}`}>
                  Lap Time
                </p>
                <span className={`text-lg font-semibold ${parsedLapTime?.normalized ? 'text-gray-200' : 'text-gray-400'}`}>
                  {parsedLapTime?.normalized || "0:00.000"}
                </span>
              </div>
              <hr className="border-zinc-700/30" />
              <div className="flex justify-between items-center py-1">
                <p className={`text-base font-medium tracking-wide ${totalLaps ? 'text-gray-400' : 'text-gray-500'}`}>
                  Laps
                </p>
                <span className={`text-lg font-semibold ${totalLaps ? 'text-gray-200' : 'text-gray-400'}`}>
                  {totalLaps.toFixed(2)}{" "}
                  <span className={`text-base font-medium ${totalLaps ? 'text-gray-300' : 'text-gray-500'}`}>
                    laps
                  </span>
                </span>
              </div>
              <hr className="border-zinc-700/30" />
              <div className="flex justify-between items-center py-1">
                <p className={`text-base font-medium tracking-wide ${fuelRequired ? 'text-gray-400' : 'text-gray-500'}`}>
                  Fuel required
                </p>
                <span className={`text-lg font-semibold ${fuelRequired ? 'text-gray-200' : 'text-gray-400'}`}>
                  {fuelRequired.toFixed(2)}{" "}
                  <span className={`text-base font-medium ${fuelRequired ? 'text-gray-300' : 'text-gray-500'}`}>
                    L
                  </span>
                </span>
              </div>
              <div className={`flex justify-between items-center p-5 mt-3 bg-blue-500/10  rounded-xl -mx-2 ${recommendedFuel ? 'bg-blue-500/10 border border-blue-500/30' : ''} duration-500 ease-out transition-all`}>
                <p className={`text-lg font-bold tracking-tight ${recommendedFuel ? 'text-white' : 'text-gray-400'}`}>
                  Recommended fuel
                  {safetyMargin !== 0 && (
                    <p className="text-base font-normal text-blue-400 mt-0.5">
                      {formatSafetyMarginCopy(safetyMargin)}
                    </p>
                  )}
                </p>
                <span className={`text-3xl font-bold ${recommendedFuel ? 'text-gray-100' : 'text-gray-400'}`}>
                  {recommendedFuel.toFixed(2)}{" "}
                  <span className={`text-xl font-semibold ${recommendedFuel ? 'text-gray-300' : 'text-gray-500'}`}>
                    L
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
