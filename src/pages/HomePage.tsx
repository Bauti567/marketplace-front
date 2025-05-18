function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Bienvenido al Marketplace</h1>
      <span>Prueba técnica</span>
      <p className="text-gray-700 text-center max-w-xl mb-6">
        Este marketplace permite a vendedores registrar productos, a compradores buscarlos y comprarlos, y a administradores monitorear toda la plataforma.
        (Todos los usuarios, se inicializan por defecto en "Seller")
      </p>
    </div>
  )
}

export default HomePage;
