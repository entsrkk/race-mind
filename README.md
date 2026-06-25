# RaceMind

RaceMind คือ desktop companion และ Tools ช่วยเหลือผู้เล่น (Driver) ที่เล่น Assetto Corsa Competizione โดยช่วยวางแผนเชื้อเพลิงและเข้าถึง racing guides ได้ในแอปเดียว

โปรเจคนี้สร้างด้วย Electron, Vite, React และ TypeScript เพื่อให้ใช้งานเป็น desktop app บน Windows

## ฟีเจอร์หลัก

- **Fuel Calculator**: ช่วย Driver คำนวณ Fuel Required และ Recommended Fuel จาก Race Duration, Lap Time, Fuel per Lap และ Safety Margin
- **GuidePage**: รวบรวม racing guides สำหรับ Assetto Corsa Competizione เช่น Track Guides, Car Setup Guides, Weather Conditions, Game Settings และ Rating Points
- **Desktop Experience**: ใช้ Electron สำหรับหน้าต่างแอปแบบ custom title bar, window controls และการเปิด external link

## Tech Stack

- Electron 30
- Vite 5
- React 19
- TypeScript strict mode
- Zustand
- Tailwind CSS v4
- Mantine v9
- Lucide React
- electron-builder

## การติดตั้งและรันโปรเจค

ติดตั้ง dependencies:

```bash
npm install
```

รัน development mode:

```bash
npm run dev
```

ตรวจ lint:

```bash
npm run lint
```

สร้าง production build และ installer:

```bash
npm run build
```

Preview production renderer build:

```bash
npm run preview
```

## คำสำคัญในโดเมน

- **Driver**: ผู้ใช้ RaceMind เพื่อวางแผนเชื้อเพลิงและอ่าน racing guides สำหรับ Assetto Corsa Competizione
- **Race Duration**: ระยะเวลาการแข่งขันที่ใช้สำหรับวางแผนเชื้อเพลิง
- **Lap Time**: เวลาเฉลี่ยต่อรอบของ Driver
- **Fuel per Lap**: ปริมาณเชื้อเพลิงที่ใช้ต่อรอบ
- **Fuel Required**: เชื้อเพลิงที่ต้องใช้ก่อนบวก Safety Margin
- **Recommended Fuel**: เชื้อเพลิงที่ RaceMind แนะนำหลังบวก Safety Margin
- **Safety Margin**: จำนวนรอบพิเศษที่ Driver เลือกเพิ่มเพื่อลดความเสี่ยงเชื้อเพลิงไม่พอ

## ขอบเขตปัจจุบัน

RaceMind รองรับ Assetto Corsa Competizione เป็นหลักในตอนนี้ ยังไม่ถือว่าเป็น multi-sim companion จนกว่าจะมีการออกแบบและรองรับ simulator อื่นอย่างตั้งใจ

## เอกสารอ้างอิงภายใน

- `CONTEXT.md`: นิยามภาษาโดเมนและคำที่ควรใช้ใน RaceMind
- `AGENTS.md`: คู่มือสำหรับ agent ที่ทำงานต่อในโปรเจคนี้
