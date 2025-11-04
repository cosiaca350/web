# Limpieza de Archivos en GitHub

## Problema
El repositorio de GitHub contiene archivos duplicados con nombres que tienen espacios y caracteres especiales, lo que causa errores de publicación.

## Archivos a Eliminar del Repositorio

### En la carpeta `AUDIOS_historias/`:
Elimina estos archivos (versiones con espacios):
- ` De la violencia a la esperanza.mp3`
- `01 SALUDO.mp3`
- `Cosiaca el culebreo.mp3`
- `El encuentro en la trocha.mp3`
- `La cancion del valle de aburra.mp3`
- `La verraquera arriera.mp3`
- `Sobre la Medellin de hoy.mp3`
- `Sobre la Medellin de los cafetales.mp3`

### Mantener estos archivos (versiones sin espacios):
- `01_SALUDO.mp3`
- `Cosiaca_el_culebreo.mp3`
- `De_la_violencia_a_la_esperanza.mp3`
- `El_encuentro_en_la_trocha.mp3`
- `La_cancion_del_valle_de_aburra.mp3`
- `La_verraquera_arriera.mp3`
- `SALUDO_cosiaca.mp3`
- `Sobre_la_Medellin_de_hoy.mp3`
- `Sobre_la_Medellin_de_los_cafetales.mp3`

## Cómo Limpiar el Repositorio

### Opción 1: Desde GitHub Web
1. Ve a: https://github.com/cosiaca350/web/tree/main/AUDIOS_historias
2. Haz clic en cada archivo con espacios
3. Haz clic en el botón de eliminar (🗑️)
4. Confirma cada eliminación

### Opción 2: Desde Git Local (Recomendado)
```bash
# Clona el repositorio
git clone https://github.com/cosiaca350/web.git
cd web

# Elimina archivos con espacios
cd AUDIOS_historias
rm "01 SALUDO.mp3"
rm "Cosiaca el culebreo.mp3"
rm "El encuentro en la trocha.mp3"
rm "La verraquera arriera.mp3"
rm "La cancion del valle de aburra.mp3"
rm "Sobre la Medellin de hoy.mp3"
rm "Sobre la Medellin de los cafetales.mp3"
rm " De la violencia a la esperanza.mp3"

# Confirma los cambios
git add -A
git commit -m "Remove duplicate audio files with spaces in names"
git push origin main
```

## Verificación
Después de limpiar, verifica que solo queden archivos con nombres sin espacios:
- Todos los nombres deben usar guiones bajos `_` en lugar de espacios
- No debe haber caracteres especiales como `á`, `é`, `í`, `ó`, `ú`, `ñ`

## Estado Actual del Proyecto Local
✅ Todos los archivos locales ya están corregidos
✅ El build se completó exitosamente
✅ No hay archivos con espacios en `public/` ni `dist/`

Solo falta limpiar el repositorio de GitHub para sincronizar los cambios.
