"use client"

const cases=[

{
number:"0001234-12.2023",
client:"João Silva",
status:"Em andamento",
court:"TJ-SP"
},

{
number:"0004321-55.2022",
client:"Maria Souza",
status:"Audiência marcada",
court:"TRT-2"
},

{
number:"0009987-22.2021",
client:"Empresa XPTO",
status:"Sentença",
court:"TJ-RJ"
}

]

export default function ProcessesTable(){

return(

<div className="bg-white border rounded-xl p-6">

<h2 className="font-semibold mb-4">
Processos Recentes
</h2>

<table className="w-full text-sm">

<thead className="text-zinc-500">

<tr>

<th className="text-left pb-3">Processo</th>
<th className="text-left pb-3">Cliente</th>
<th className="text-left pb-3">Status</th>
<th className="text-left pb-3">Tribunal</th>

</tr>

</thead>

<tbody>

{cases.map((c,i)=>(

<tr key={i} className="border-t">

<td className="py-3">{c.number}</td>
<td>{c.client}</td>
<td>{c.status}</td>
<td>{c.court}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}