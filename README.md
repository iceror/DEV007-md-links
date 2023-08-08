# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Guía de uso](#2-guia-de-uso)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Guía de uso

## Instalación: 
npm i md-links-iceror

## Cómo usar la CLI 
### Comando 
npx md-links ./ruta-de-tu-archivo

#### Este comando retornará la siguiente información de los links encontrados:
{  
  href: https://example-link.com,  
  text: Example Links,  
  file: ./ruta-del-archivo  
}  

### Comando + flag --validate
npx md-links ./ruta-de-tu-archivo --validate

#### Este comando retornará la siguiente información de los links encontrados:
{  
  href: https://example-link.com,  
  text: Example Links,  
  file: ./ruta-del-archivo,  
  status: 200 o null,  
  ok: ok o fail  
}  

### Comando + flag --stats
npx md-links ./ruta-de-tu-archivo --stats

#### Este comando retornará un total de links y links únicos:
Statistics after validating links found in ./archivos/archivo.md :  
Total:  5  
Unique:  3  

### Comando + flag --stats --validate 
npx md-links ./ruta-de-tu-archivo --stats --validate

#### Este comando retornará un total de links, links únicos y links rotos:
Statistics after validating links found in ./archivos/archivo.md :  
Total:  5  
Unique:  3  
Broken:  3  
