# RaceMind

RaceMind is a desktop companion for Assetto Corsa Competizione drivers. Its current domain centers on planning fuel from Race Duration, Lap Time, and Fuel per Lap, and providing racing guides.

## Language

**RaceMind**:
The desktop companion and Tools used to help a Driver who plays Assetto Corsa Competizione plan fuel and access racing guides. RaceMind serves as a platform for both the Fuel Calculator and Racing Guides.
_Avoid_: generic "app" when discussing product behavior, multi-sim companion until RaceMind intentionally supports more simulators.

**Assetto Corsa Competizione**:
The racing simulator RaceMind supports in its current product scope.
_Avoid_: ACC unless the surrounding context has already introduced the abbreviation, generic racing sims when discussing current RaceMind behavior.

**Driver**:
The person using RaceMind to plan fuel for Assetto Corsa Competizione and access racing guides. Use Driver when discussing inputs, fuel decisions, and racing context.
_Avoid_: user, player when discussing racing decisions.

**Fuel Calculator**:
The RaceMind tool that estimates fuel needs from session length, average lap time, and fuel consumption per lap.
_Avoid_: fuel tool, calculator when the fuel-specific context is not obvious.

**GuidePage**:
The section of RaceMind that provides racing guides for Assetto Corsa Competizione. RaceMind serves as the platform that stores these guides for easy Driver access.
_Avoid_: guide section, help section when the racing guide context is not obvious.

**Track Guides**:
Racing guides organized by Track Name, providing information about specific circuits such as braking points, racing lines, and corner types.
_Avoid_: track guides when the specific context is not obvious.

**Car Setup Guides**:
Racing guides organized by Setup Parameter Type, explaining car setup parameters such as toe, camber, suspension, and tire pressure. These guides explain how different parameter values affect handling and what settings to use for specific handling characteristics.
_Avoid_: car setup guides when the specific context is not obvious.

**Weather Conditions**:
Racing guides organized by Weather Type, providing guidance for different weather conditions such as dry, wet, and mixed conditions.
_Avoid_: weather guides when the specific context is not obvious.

**Game Setting**:
Racing guides organized by Setting Category, providing guidance for game settings such as graphics and physics.
_Avoid_: settings guides when the specific context is not obvious.

**Rating Point**:
Racing guides organized by Rating Type, explaining the rating system such as Driver Rating (DR), Track Rating (TR), and Safety Rating (SA).
_Avoid_: rating guides when the specific context is not obvious.

**Race Parameters**:
The input values a Driver provides before calculating fuel: Race Duration, Lap Time, Fuel per Lap, and Safety Margin.
_Avoid_: settings, form fields.

**Race Duration**:
The planned length used for fuel planning, expressed as a whole number of minutes from 10 to 75 in the current Fuel Calculator. RaceMind uses this term because it is easy for Drivers to understand; the range may expand to 360 minutes later to support 6-hour endurance races.
_Avoid_: time limit, session length.

**Lap Time**:
The driver's expected average time to complete one lap. RaceMind displays Lap Time in canonical `m:ss.SSS` format such as `1:45.000`, accepts shorthand `m:ss`, and normalizes leading-zero minutes such as `01:45.000` to the canonical format. Seconds must always use two digits; milliseconds display as three digits, while one- or two-digit millisecond input is accepted and normalized; raw seconds are not accepted as Lap Time input.
_Avoid_: decimal minutes, raw seconds, pace unless referring to a broader driving-performance concept.

**Fuel per Lap**:
The expected amount of fuel consumed during one lap, expressed in liters and entered by the Driver with up to two decimal places. Fuel per Lap must be at least `0.01 L/lap`; RaceMind does not impose a domain upper bound yet.
_Avoid_: average fuel, fuel usage, consumption when a per-lap value is specifically meant.

**Laps**:
The decimal number of laps estimated from Race Duration and Lap Time. RaceMind keeps this value precise instead of rounding it, displays it to two decimal places, and lets Safety Margin handle any extra fuel the Driver wants.
_Avoid_: rounded laps, fuel laps, rounds.

**Fuel Required**:
The estimated fuel needed for the decimal Laps value before any Safety Margin is added. Show this alongside Recommended Fuel so the Driver can see the exact calculation before margin, displayed to two decimal places in liters.
_Avoid_: base fuel unless discussing implementation internals.

**Recommended Fuel**:
The fuel amount RaceMind suggests carrying after applying the driver's selected Safety Margin to Fuel Required. Show this alongside Fuel Required even when Safety Margin is `0` and both values match. Near Recommended Fuel, explain the selected margin with result copy such as "Includes no safety margin" or "Includes +1 safety lap".
_Avoid_: total fuel unless it explicitly includes the safety margin.

**Safety Margin**:
Optional whole extra laps from `0` to `3` added beyond the estimated Laps to reduce the chance of running short. Use Safety Margin as the input/control label; it defaults to `0` so the Driver first sees the exact estimate, then chooses whether to add margin.
_Avoid_: fixed buffer, automatic +1 lap, liters as the primary margin unit.

## Flagged Ambiguities

**Race Duration Naming**:
Resolved: use **Race Duration** as the canonical term in the Fuel Calculator.

## Example Dialogue

Driver: "I need fuel for a 30 minute Race Duration."

RaceMind: "Enter Race Duration, Lap Time, and Fuel per Lap. RaceMind will estimate Laps, calculate Fuel Required, then add a Safety Margin to produce Recommended Fuel."

Driver: "So Recommended Fuel is not just Fuel Required?"

RaceMind: "Correct. Recommended Fuel includes the Safety Margin."

Driver: "Can I also find racing guides in RaceMind?"

RaceMind: "Yes, RaceMind provides Track Guides, Car Setup Guides, Weather Conditions guides, Game Settings guides, and Rating Point guides to help you master Assetto Corsa Competizione."
