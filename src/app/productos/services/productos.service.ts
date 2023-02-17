import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IProductos, IResponse } from '../interfaces/data.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environment.baseUrl;
  private userToken: string = JSON.parse(localStorage.getItem('user')!).userToken;


  private productos$ = new BehaviorSubject<IProductos>({
    "menu": [
        {
            "id": 1,
            "icon": "Clear",
            "productId": 1,
            "redirectTo": "/xtracking"
        },
        {
            "id": 2,
            "icon": "Adb",
            "productId": 2,
            "redirectTo": "/colmedica"
        },
        {
            "id": 3,
            "icon": "AddLocation",
            "productId": 3,
            "redirectTo": "/efecty"
        },
        {
            "id": 4,
            "icon": "Airplay",
            "productId": 4,
            "redirectTo": "/colmena"
        },
        {
            "id": 5,
            "icon": "Android",
            "productId": 5,
            "redirectTo": "/medplus"
        },
        {
            "id": 6,
            "icon": "Apple",
            "productId": 6,
            "redirectTo": "/urosario"
        }
    ],
    "products": [
        {
            "id": 1,
            "path": "/xtracking",
            "image": "https://www.xtracking.co/images/logo-xtracking.svg",
            "title": "Xtracking",
            "longDescription": "Con la aplicación móvil de XtrackingP podrás:\n- Hacer gestión de las encuestas en donde quiera que estés.\n- Recibir en tiempo real información de interés, cualitativa y cuantitativa, sobre tus productos o servicios.\n- Revisar los comentarios de tus clientes en el momento en que suceden.\n- Calcular tu NPS real.\n- Crear un canal directo y permanente con tus clientes para así tomar decisiones estratégicas.\n\nFunciones principales de XtrackingP:\n- Recibir push notifications en tiempo real.\n- Hacer filtros de quejas/ comentarios por fechas y canales de servicio.\n- Visualización de la información, tanto cualitativa como cuantitativa, directamente en tu app.\n- Crear un canal de comunicación directo con tu cliente y con tus sedes para dar respuesta inmediata.",
            "shortDescription": "XtrackingP es una aplicación móvil para medir la satisfacción y experiencia de los clientes con tus productos o servicios, en tiempo real."
        },
        {
            "id": 2,
            "path": "/colmedica",
            "image": "https://www.colombochilena.com/public/uploads/2015/12/Mesa-de-trabajo-1-100.jpg",
            "title": "Colmédica",
            "longDescription": "Funcionalidades de video para Autorizaciones médicas y Servicio de Orientación Médica - SOM por video llamada.\n\nA la hora que usted nos necesite, en la funcionalidad SOM por video llamada, un profesional de la salud estará atento y le brindará información sobre:\n\n•Manejo de la situación de salud en su casa u oficina.\n•Institución hospitalaria más cercana de acuerdo con su ubicación geográfica.\n•Envío de médico domiciliario o ambulancia en caso de requerirse.\n\nAdemás, usted cuenta con la posibilidad de ingresar desde su dispositivo móvil y/o tableta y acceder a las siguientes funcionalidades:\n",
            "shortDescription": "Gracias a nuestra App Colmédica para teléfonos inteligentes y tabletas, usted tiene la posibilidad de acceder a aquella información de nuestros servicios que con mayor frecuencia y urgencia suele requ"
        },
        {
            "id": 3,
            "path": "/efecty",
            "image": "https://cityplazacc.com/wp-content/uploads/2020/01/EFECTY.jpg",
            "title": "Efecty",
            "longDescription": "- Envío de giros.\n- Consultar la relación de giros enviados y de giros disponibles para retiro.\n- Realizar y consultar el pago de tus obligaciones de diferentes convenios.\n- Conocer las tarifas de los servicios de la compañía.\n- Ubicar los más de 10.000 puntos físicos de servicio para realizar tus transacciones si así lo requieres.\n- Informarte sobre nuestras promociones y eventos.\n",
            "shortDescription": "Efecty pensando en ti, pone a tu disposición la APP como una de las soluciones de nuestro ecosistema digital, que te permitirá:"
        },
        {
            "id": 4,
            "path": "/colmena",
            "image": "https://www.colmenaseguros.com/Style%20Library/Responsive/images/logocolmena-new.png",
            "title": "Colmena",
            "longDescription": "A través de esta aplicación móvil y de nuestro portal web, podrás administrar tu seguro de personas y también acceder a diferentes beneficios que incluyen: Consulta, personalización y compra de nuestros productos, comunicación directa con tu asesor, creación de una red de referidos, y recibir notificaciones con información de interés",
            "shortDescription": "En Colmena Seguros hacemos las cosas más fáciles para nuestros clientes, por eso te ofrecemos un medio para asesorarte y acompañarte en la compra de tus seguros de personas."
        },
        {
            "id": 5,
            "path": "/medplus",
            "image": "https://www.medplus.com.co/wp-content/uploads/2017/03/logoMedPlusEmail.png",
            "title": "Medplus",
            "longDescription": "Tu tiempo es importante, por eso queremos hacer tu vida más fácil con las nuevas funcionalidades de nuestra app saludable.\n\n• Directorio médico: Consulta los profesionales de la salud que pueden atenderte según la especialidad que necesitas.\n• Revista MedPlus: Entérate de todas las últimas noticias.\n• Redes sociales: No te pierdas nada de lo que tenemos para ti.",
            "shortDescription": "Te mereces más facilidades, ahora todos los servicios de MedPlus ¡en tu mano!"
        },
        {
            "id": 6,
            "path": "/urosario",
            "image": "https://web.infometrika.com/wp-content/uploads/2018/04/UROSARIO_Logo_Horizontal_PO-1.jpg",
            "title": "Universidad del Rosario",
            "longDescription": "CASAUR virtual en su primera versión permite contactarse con un agente a través de un móvil, para la orientación y gestión de servicios de apoyo académico, asesoría financiera, entre otros; realizar el registro de solicitud de carnet y extracto de pago créditos UR y becas, gestionar citas para una atención presencial sobre los servicios que hoy en día se brindan desde CASAUR sede Centro.\n\nAdicionalmente, CASAUR virtual cuenta con un módulo en el cual se encuentra la descripción de cada una de las sedes de la Universidad del Rosario, georreferenciadas dependiendo del sitio donde se encuentre ubicado; así tiene la posibilidad de conocer el tiempo estimado para llegar a cada una de las sedes y una guía a la mano sobre horarios, direcciones y servicios.",
            "shortDescription": "CASAUR virtual es un canal de atención en línea, que permite desde cualquier lugar obtener una atención personalizada por un agente virtual a través de video conferencia y chat."
        }
    ]
});


  constructor(private http: HttpClient) {

   //this.getProductos()
   //  .subscribe(res => {
   //    //Si existe la data
   //    if(res.data){
   //      this.productos$.next(res.data);
   //    }
   //  });

  }

  private getProductos(): Observable<IResponse<IProductos>> {
    return this.http.post<any>(`${this.baseUrl}/getproducts`, { userToken: this.userToken })
      .pipe(
        map(response => {
          response.data = JSON.parse(response.data)
          return response;
        })
      )
  }

  //Obtenemos la data de la peticion con el token registrado
  public obtenerData(): Observable<IProductos> {
    return this.productos$.asObservable();
  }

}
