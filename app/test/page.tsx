export default function TestPage() {
  return (
    <div className="p-8 bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Test de Estilos</h1>
        <p className="text-gray-600 mb-4">
          Si ves este contenido con estilos (fondo azul claro, tarjeta blanca con sombra), 
          entonces Tailwind CSS está funcionando correctamente.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Botón de Prueba
        </button>
      </div>
    </div>
  )
}
