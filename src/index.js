const express=require('express');
const cors=require('cors');
const app=express();
const PORT=4000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hola desde el backend');
});

const productosRouter=require('./routes/productos');
app.use('/api/productos',productosRouter);
const mesasRouter=require('./routes/mesas');
console.log("Mesas cargadas correctamente");
app.use('/api/mesas',mesasRouter);

app.listen(PORT,()=>{
    console.log(`Servidor esta escuchando en el puerto  http://localhost:${PORT}`);
});

const pedidosRouter=require('./routes/pedidos');
app.use('/api/pedidos',pedidosRouter);

const camarerosRouter=require("./routes/camareros");
app.use("/api/camareros",camarerosRouter);