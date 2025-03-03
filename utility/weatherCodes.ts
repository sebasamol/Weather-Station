export type WeatherCode = {
    code: number;
    icon: string;
    description: string;
}

export const WEATHER_CODES: WeatherCode[] = [
    { code: 0, icon:'/sunny.png', description: 'Bezchmurne niebo', },
    { code: 1, icon:'/partly-cloudy.png', description: 'Głównie bezchmurne niebo' },
    { code: 2, icon:'/partly-cloudy.png', description: 'Częściowo zachmurzone niebo' },
    { code: 3, icon:'/cloudy.png', description: 'Zachmurzone niebo' },
    { code: 45, icon:'/fog.png', description: 'Mgła' },
    { code: 48, icon:'/fog.png', description: 'Osadzająca się mgła' },
    { code: 51, icon:'/drizzle.png', description: 'Lekka mżawka' },
    { code: 53, icon:'/drizzle.png', description: 'Umiarkowana mżawka' },
    { code: 55, icon:'/drizzle.png', description: 'Mżawka o gęstym natężeniu' },
    { code: 56, icon:'/drizzle.png', description: 'Marznąca mżawka' },
    { code: 57, icon:'/drizzle.png', description: 'Mżawka o gęstym natężeniu' },
    { code: 61, icon:'/rain.png', description: 'Lekki deszcz' },
    { code: 63, icon:'/rain.png', description: 'Deszcz umiarkowany' },
    { code: 65, icon:'/rain.png', description: 'Ulewny deszcz' },
    { code: 66, icon:'/freezing_rain.png', description: 'Marznący lekki deszcz' },
    { code: 67, icon:'/freezing_rain.png', description: 'Ulewny marznący deszcz' },
    { code: 71, icon:'/snow.png', description: 'Niewielki opad śniegu' },
    { code: 73, icon:'/snow.png', description: 'Umiarkowany opad śniegu' },
    { code: 75, icon:'/snow.png', description: 'Intensywny opad śniegu' },
    { code: 77, icon:'/snow.png', description: 'Ziarnisty śnieg' },
    { code: 80, icon:'/rain.png', description: 'Lekkie opady deszczu' },
    { code: 81, icon:'/rain.png', description: 'Gwałtowny deszcz' },
    { code: 85, icon:'/snow.png', description: 'Lekkie opady śniegu' },
    { code: 86, icon:'/snow.png', description: 'Obfite opady śniegu' },
    { code: 95, icon:'/thunderstorm.png', description: 'Burza z piorunami' },
    { code: 96, icon:'/thunderstorm.png', description: 'Burza z lekkim gradem' },
    { code: 99, icon:'/thunderstorm.png', description: 'Burza z silnym gradem' }
]
