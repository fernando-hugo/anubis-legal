import { processos } from "@/data/mockData";

export default function ProcessTable() {

  return (
    <div className="bg-white rounded-xl border p-6">

      <h2 className="font-bold mb-4">
        Processos
      </h2>

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left border-b">
            <th>Nº Processo</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Advogado</th>
            <th>Status</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>

          {processos.map((p, i) => (

            <tr key={i} className="border-b">

              <td>{p.numero}</td>
              <td>{p.cliente}</td>
              <td>{p.tipo}</td>
              <td>{p.advogado}</td>
              <td>{p.status}</td>
              <td>{p.valor}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
