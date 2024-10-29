# Hello Anak Bangkit 

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://media.tenor.com/PwyXG1fXm_IAAAAM/asuka-langley.gif">
    <img alt="Taipy" src="https://c.tenor.com/oifgBY6atjsAAAAC/tenor.gif" width="600" />
  </picture>
</div>

### How to run 
1. `npm i`
2. create database klean
3. trus buat `.env` dari `.env example`
4. sesuai kan file env dngn database klean, <br> **note** : password gabisa kosong, jadi buat user baru aja di mysql dan isi password
5. untuk migrate jalankan `npx drizzle-kit migrate`
6. running app `npm run dev`
7. yeyy hrusnya express app kita jalan
   
### Library/Tools Used
- Typescript
- Express
- Drizzle ORM
- Mysql
- JWT

### Important note !!
- database user gaboleh kosong passowrdny , klo g error ntar, buat user baru aja

### Build for prod !!
- `npm run build`
- terakhir untuk mulai servernya `npm run start`