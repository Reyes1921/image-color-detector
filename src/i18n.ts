import i18n from "i18next"
import {initReactI18next} from "react-i18next"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        drop: "Drop an Image",
        o: "or",
        palette: "Color palette",
        upload: "Upload a File",
        mb: "10Mb Max",
        types: "PNG, JPG, JPEG, SVG, WEBP, and GIF are Allowed.",
        linkedin: "https://www.linkedin.com/in/reyes-rondon/?locale=en_US",
        error: "Error on Upload, check type and size of the image",
        info: "Easily and simply extract a variety of colors from any image that is less than 10mb in PNG, JPG, JPEG, SVG, WEBP, and GIF format. It allows you to have the colors in hexadecimal and rgb version as well as to copy them and have them ready to use. This tool is useful to have an idea of the contrasts in colors that any image offers you to have an idea of a background or colors of letters that match the image.",
      },
    },
    es: {
      translation: {
        drop: "Soltar una imagen",
        o: "o",
        palette: "Paleta de colores",
        upload: "Cargar un archivo",
        mb: "10Mb Máximo",
        types: "Se permiten PNG, JPG, JPEG, SVG, WEBP y GIF.",
        linkedin: "https://www.linkedin.com/in/reyes-rondon/",
        error: "Error al cargar, compruebe el tipo y tamaño de la imagen",
        info: "Extrae de forma fácil y sencilla una gran variedad de colores de cualquier imagen que pese menos de 10mb en formato PNG, JPG, JPEG, SVG, WEBP y GIF. Permite tener los colores en versión hexadecimal y rgb así como copiarlos y tenerlos listos para usar. Esta herramienta es útil para tener una idea de los contrastes en colores que te ofrece cualquier imagen para tener una idea de un fondo o colores de letras que combinen con la imagen.",
      },
    },
  },
})
export default i18n
