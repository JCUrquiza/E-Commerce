import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {

    // 1. Borrar registros previos
    await Promise.all([
        prisma.user.deleteMany({}),
        prisma.country.deleteMany({}),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]);

    const { categories, products, users } = initialData;

    // Insertar usuarios en la BBDD
    await prisma.user.createMany({ data: users });

    // Insertar los paises
    await prisma.country.createMany({
        data: countries
    });

    // 2. Insertar categorias
    const  categoriesData = categories.map( category => ({
        name: category
    }));
    await prisma.category.createMany({ data: categoriesData });

    // Crear objeto de categorias: { 'nombre': 'id' }
    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[ category.name.toLowerCase() ] = category.id
        return map;
    }, {} as Record<string, string>);   // <string=shirt, string=categoryDB>

    // 3. Insertar Product e ProductImage
    products.forEach( async(product) => {

        // Product
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        // ProductImage
        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

    });

    




    console.log('Seed ejecutado correctamente');
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();
