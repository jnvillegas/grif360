import React, { useState } from "react";
import { Form, Modal, Col, Row, Button, Popconfirm } from "antd";
import "./elementosForm.css";
import escena from "../assets/escena.png";
import { GoogleApi } from "./googleApi";
import LoadingSpin from "./loadingSpin";

export default function ArchivadasForm({
  visible,
  alCerrar,
  alAceptar,
  archivadas,
  eliminarExperiencia,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const sanitizarProyectoAbierto = (p) => {
    console.log("DATA DEL PROYECTO ABIERTO EN ARCHIVADAS FORM: ", p);
    let proyectoAbierto = {
      id: "",
      escenas: [],
      nombre: "",
      isAnimated: false,
      linkUrl: "",
      titulo360: "",
      redesSociales: {
        facebook: "",
        twitter: "",
        youtube: "",
      },
      otras360: [
        {
          icono: "",
          titulo: "",
          url: "",
          imagen: "",
        },
      ],
    };
    if (p.id) proyectoAbierto.id = p.id;
    if (p.nombre) proyectoAbierto.nombre = p.nombre;
    if (p?.isAnimated !== undefined) {
      proyectoAbierto["isAnimated"] = p.isAnimated;
    } else {
      proyectoAbierto["isAnimated"] = false;
    }
    if (p?.linkUrl !== undefined) {
      proyectoAbierto["linkUrl"] = p.linkUrl;
    } else {
      proyectoAbierto["linkUrl"] = "";
    }

    if (p?.titulo360 !== undefined) {
      proyectoAbierto["titulo360"] = p.titulo360;
    } else {
      proyectoAbierto["titulo360"] = "";
    }

    if (p?.redesSociales !== undefined) {
      proyectoAbierto["redesSociales"] = p.redesSociales;
    } else {
      proyectoAbierto["redesSociales"] = {
        facebook: "",
        twitter: "",
        youtube: "",
      };
    }

    if (p?.otras360 !== undefined && Array.isArray(p.otras360)) {
      // Verificar si alguno de los objetos en el array contiene la key "nombre"
      const hasInvalidKey = p.otras360.some(item => item.hasOwnProperty("nombre"));
      
      if (!hasInvalidKey) {
        proyectoAbierto["otras360"] = p.otras360;
      } else {
        // Si la lista contiene la key "nombre", se crea un objeto vacío
        proyectoAbierto["otras360"] = [
          // {
          //   icono:"camioneta",
          //   titulo: "Nissan Kicks",
          //   url: "https://agnnissan.com.ar/vehiculos/autos/x-trail-e-power/",
          //   imagen: "https://agnnissan.com.ar/wp-content/uploads/2024/03/nissan-kicks.png",
          // }
          // {
          //   icono: "",
          //   titulo: "",
          //   url: "",
          //   imagen: "",
          // }
        ];
      }
    } else {
      // Si no hay datos, se crea un objeto vacío
      proyectoAbierto["otras360"] = [
        // {
        //   icono: "",
        //   titulo: "",
        //   url: "",
        //   imagen: "",
        // }
      ];
    }
    
    

    // if (p?.otras360 !== undefined) {
    //   proyectoAbierto["otras360"] = p.otras360;
    // } else {
    //   proyectoAbierto["otras360"] = [
    //     {
    //       icono: "",
    //       titulo: "",
    //       url: "",
    //       imagen: "",
    //     }
    //   ];
    // }

    if (p.escenas)
      proyectoAbierto.escenas = p.escenas.map((e) => {
        return {
          titulo: e.titulo ?? "",
          fondo: e.fondo ?? "",
          elementos: e.elementos
            ? e.elementos.map((el) => {
                let r = {
                  id: el.id ?? Date.now(),
                  nombre: el.nombre ?? "",
                  position: el.position ?? { x: 0, y: 0, z: 0 },
                  rotation: el.rotation ?? { x: 0, y: 0, z: 0 },
                  tipo: el.tipo ?? 1,
                };
                if (r.tipo == 0) return { ...r, video: el.video ?? "" };
                if (r.tipo == 1)
                  return {
                    ...r,
                    titulo: el.titulo ?? "",
                    texto: el.texto ?? "",
                  };
                if (r.tipo == 2) return { ...r, escena: el.escena ?? "" };
                if (r.tipo == 3) return { ...r, imagen: el.imagen ?? "" };
              })
            : [],
          principal: e.principal ?? false,
          inicio: e.inicio ?? { x: 0, y: 0 },
        };
      });
    console.log(proyectoAbierto);
    return proyectoAbierto;
  };

  const eliminarExp = () => {
    form
      .validateFields()
      .then((values) => {
        eliminarExperiencia(values.experiencia);
        alCerrar();
      })
      .catch((info) => {
        console.log("No puede Continuar:", info);
      });
  };

  const cancelarModal = () => {
    alCerrar();
  };

  const abrirExperiencia = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        let e = await GoogleApi.getFileById(values.experiencia);
        alAceptar(sanitizarProyectoAbierto(e));
        setLoading(false);
        form.resetFields();
        //onCreate(values);
      })
      .catch((info) => {
        console.log("No puede Continuar:", info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Mis Experiencias Archivadas"
      okText="Abrir"
      cancelText="Cancelar"
      footer={[
        <Popconfirm
          title="Eliminar Experiencia"
          description="Realmente desea eliminar esta experiencia?"
          onConfirm={eliminarExp}
          okText="Si"
          cancelText="No"
        >
          <Button style={{ float: "left" }} type="primary" danger>
            Eliminar
          </Button>
        </Popconfirm>,
        <Button onClick={cancelarModal}>Cancelar</Button>,
        <Button type="primary" onClick={abrirExperiencia}>
          Abrir
        </Button>,
      ]}
      onCancel={cancelarModal}
      //onOk={}
    >
      <Form
        form={form}
        layout="vertical"
        name="archivadasForm"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="experiencia"
          rules={[
            {
              required: true,
              message: "Seleccione una Experiencia Archivada",
            },
          ]}
        >
          <Row gutter={[16, 24]}>
            {archivadas.map((a, k) => (
              <Col
                key={k}
                className="gutter-row"
                span={6}
                style={{ textAlign: "center" }}
              >
                <input
                  type="radio"
                  name="experiencia"
                  id={a.id}
                  style={{ display: "none" }}
                  value={a.id}
                />
                <label htmlFor={a.id}>
                  <img alt="experiencia" src={escena} width={50} height={50} />
                  <br />
                  {a.name.split("-")[0]}
                </label>
              </Col>
            ))}
          </Row>
        </Form.Item>
      </Form>
      <LoadingSpin visible={loading} />
    </Modal>
  );
}
