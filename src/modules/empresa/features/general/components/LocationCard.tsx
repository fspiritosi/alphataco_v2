// 'use client'
// import { Card, CardHeader, CardContent } from "@/shared/components/ui/card"
// import React from "react";
// import { getCompanyDataType } from "@/modules/empresa/actions/general_actions";

// export const LocationCard = ({ companyData }: { companyData: getCompanyDataType }) => {
//     const [showMap, setShowMap] = React.useState(false);
    
//     // Coordenadas aproximadas de Rincón de Los Sauces, Neuquén, Argentina
//     const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(companyData.address + ', ' + companyData.cities.name + ', ' + companyData.country)}`;
    
//     return (
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between mb-4">

//         <h3 className="text-lg font-semibold text-foreground">Ubicación</h3>
//         <div className="flex items-center justify-between ">
//           </div>
//           <button
//             onClick={() => setShowMap(!showMap)}
//             className="text-blue-600 hover:text-blue-700 dark:text-blue-100 dark:hover:text-blue-200 text-sm font-semibold flex items-center space-x-1"
//           >
//             <span>{showMap ? '📍' : '🗺️'}</span>
//             <span>{showMap ? 'Ocultar mapa' : 'Ver mapa'}</span>
//           </button>
//         </div>
//         </CardHeader>
//         <CardContent>
        
        
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-semibold text-foreground dark:text-blue-300">Dirección</label>
//             <p className="font-medium text-foreground">{companyData.address}</p>
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-foreground dark:text-blue-300">Ciudad</label>
//             <p className="font-medium text-foreground">{companyData.cities.name}</p>
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-foreground dark:text-blue-300">País</label>
//             <p className="font-medium text-foreground capitalize">{companyData.country}</p>
//           </div>
          
//           {showMap && (
//             <div className="mt-4">
//               <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border overflow-hidden">
//                 {/* Placeholder para Google Maps */}
//                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900">
//                   <div className="text-center">
//                     <div className="text-4xl mb-2">🗺️</div>
//                     <p className="text-sm text-foreground dark:text-blue-300 font-medium">Google Maps</p>
//                     <p className="text-xs text-foreground dark:text-blue-300">{companyData.address}</p>
//                     <p className="text-xs text-foreground dark:text-blue-300 capitalize">{companyData.cities.name}, {companyData.country}</p>
//                   </div>
//                 </div>
//                 {/* 
//                 Para implementar Google Maps real, reemplaza el div anterior con:
//                 <iframe
//                   src={mapUrl}
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 ></iframe>
//                 */}
//               </div>
//               <p className="text-xs text-foreground dark:text-blue-300 mt-2">
//                 💡 Para usar Google Maps real, necesitas configurar tu API key de Google Maps
//               </p>
//             </div>
//           )}
//         </div>
//         </CardContent>
//       </Card>
//     );
//   };
  