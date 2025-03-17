export const AIR_QUALITY_PARAMS = [
    { id: 1, name: 'AQI', unit: '/100', key: 'european_aqi', description: 'Indeks jakości powietrza zgodny z normą europejską' },
    { id: 2, name: 'PM10', unit: 'μg/m³', key: 'pm10', description: 'Cząstki pyłu o średnicy 10 μm (PM10)' },
    { id: 3, name: 'PM2.5', unit: 'μg/m³', key: 'pm2_5', description: 'Cząstki pyłu o średnicy 2.5 μm' },
    { id: 4, name: 'NO₂', unit: 'μg/m³', key: 'nitrogen_dioxide', description: 'Dwutlenek azotu' },
    { id: 5, name: 'SO₂', unit: 'μg/m³', key: 'sulphur_dioxide', description: 'Dwutlenek siarki' },
    { id: 6, name: 'CO', unit: 'μg/m³', key: 'carbon_monoxide', description: 'Tlenek węgla' },
    { id: 7, name: 'O₃', unit: 'μg/m³', key: 'ozone', description: 'Ozon' },
    { id: 8, name: 'Pyły', unit: 'μg/m³', key: 'dust', description: 'Pyły' },
] as const;