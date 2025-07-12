import { type NextRequest, NextResponse } from "next/server"
import jsPDF from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cart, customFeatures, contractType, phases, totals, language } = await req.json()

    const doc = new jsPDF()
    const primaryColor = [59, 130, 246]
    const secondaryColor = [107, 114, 128]
    const accentColor = [16, 185, 129]

    const isSpanish = language === "es"

    // Header
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(isSpanish ? "PRESUPUESTO DE DESARROLLO WEB" : "WEB DEVELOPMENT BUDGET", 20, 25)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(
      `${isSpanish ? "Fecha" : "Date"}: ${new Date().toLocaleDateString(isSpanish ? "es-ES" : "en-US")}`,
      150,
      32,
    )

    // Developer Info
    doc.setFontSize(10)
    doc.text("Horacio Gutierrez", 20, 32)
    doc.text("horacio.estevez@gmail.com", 20, 36)

    doc.setTextColor(0, 0, 0)
    let yPosition = 60

    // Project Information
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...primaryColor)
    doc.text(isSpanish ? "INFORMACIÓN DEL PROYECTO" : "PROJECT INFORMATION", 20, yPosition)

    yPosition += 15
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)

    const contractTypeLabels = isSpanish
      ? {
          freelance: "Por Horas (Freelance) - 20% descuento",
          modular: "Módulos Escalonados - 10% descuento",
          package: "Proyecto Completo - Precio estándar",
        }
      : {
          freelance: "Hourly (Freelance) - 20% discount",
          modular: "Modular Phases - 10% discount",
          package: "Complete Project - Standard price",
        }

    doc.text(
      `${isSpanish ? "Tipo de Contratación" : "Contract Type"}: ${contractTypeLabels[contractType as keyof typeof contractTypeLabels]}`,
      20,
      yPosition,
    )
    yPosition += 8
    doc.text(`${isSpanish ? "Número de Fases" : "Number of Phases"}: ${phases}`, 20, yPosition)
    yPosition += 8
    doc.text(
      `${isSpanish ? "Tiempo Total Estimado" : "Total Estimated Time"}: ${totals.totalHours} ${isSpanish ? "horas" : "hours"} (${Math.ceil(totals.totalHours / 8)} ${isSpanish ? "días laborales" : "work days"})`,
      20,
      yPosition,
    )

    yPosition += 20

    // Services Table
    if (cart.length > 0) {
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...primaryColor)
      doc.text(isSpanish ? "SERVICIOS SELECCIONADOS" : "SELECTED SERVICES", 20, yPosition)
      yPosition += 10

      const tableData = cart.map((item: any) => [
        item.name,
        item.quantity.toString(),
        `$${item.basePrice.toLocaleString()}`,
        `${item.timeHours}h`,
        `$${(item.basePrice * item.quantity).toLocaleString()}`,
      ])

      const headers = isSpanish
        ? ["Servicio", "Cant.", "Precio Unit.", "Tiempo", "Subtotal"]
        : ["Service", "Qty.", "Unit Price", "Time", "Subtotal"]

      doc.autoTable({
        startY: yPosition,
        head: [headers],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 10,
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0],
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 20, halign: "center" },
          2: { cellWidth: 30, halign: "right" },
          3: { cellWidth: 25, halign: "center" },
          4: { cellWidth: 35, halign: "right" },
        },
        margin: { left: 20, right: 20 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 15
    }

    // Custom Features Table
    if (customFeatures.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...primaryColor)
      doc.text(isSpanish ? "FUNCIONALIDADES PERSONALIZADAS" : "CUSTOM FEATURES", 20, yPosition)
      yPosition += 10

      const customTableData = customFeatures.map((feature: any) => [
        feature.description,
        `${feature.estimatedHours}h`,
        `$${feature.estimatedPrice.toLocaleString()}`,
      ])

      const customHeaders = isSpanish ? ["Descripción", "Tiempo", "Precio"] : ["Description", "Time", "Price"]

      doc.autoTable({
        startY: yPosition,
        head: [customHeaders],
        body: customTableData,
        theme: "grid",
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 10,
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0],
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 120 },
          1: { cellWidth: 25, halign: "center" },
          2: { cellWidth: 35, halign: "right" },
        },
        margin: { left: 20, right: 20 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 15
    }

    // Cost Summary
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 30
    }

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...primaryColor)
    doc.text(isSpanish ? "RESUMEN DE COSTOS" : "COST SUMMARY", 20, yPosition)
    yPosition += 15

    const summaryLabels = isSpanish
      ? {
          subtotal: "Subtotal de Servicios",
          contractAdjustment: "Ajuste por Tipo de Contrato",
          phaseAdjustment: "Ajuste por Fases",
          finalTotal: "TOTAL FINAL",
          noDiscount: "Sin descuento",
          noSurcharge: "Sin recargo",
        }
      : {
          subtotal: "Services Subtotal",
          contractAdjustment: "Contract Type Adjustment",
          phaseAdjustment: "Phase Adjustment",
          finalTotal: "FINAL TOTAL",
          noDiscount: "No discount",
          noSurcharge: "No surcharge",
        }

    const summaryData = [
      [summaryLabels.subtotal, `$${totals.baseTotal.toLocaleString()}`],
      [
        summaryLabels.contractAdjustment,
        totals.priceMultiplier < 1 ? `-${((1 - totals.priceMultiplier) * 100).toFixed(0)}%` : summaryLabels.noDiscount,
      ],
      [
        summaryLabels.phaseAdjustment,
        totals.phaseMultiplier > 1 ? `+${((totals.phaseMultiplier - 1) * 100).toFixed(0)}%` : summaryLabels.noSurcharge,
      ],
      ["", ""],
      [summaryLabels.finalTotal, `$${totals.finalPrice.toLocaleString()}`],
    ]

    doc.autoTable({
      startY: yPosition,
      body: summaryData,
      theme: "plain",
      bodyStyles: {
        fontSize: 11,
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 120, fontStyle: "normal" },
        1: { cellWidth: 50, halign: "right", fontStyle: "normal" },
      },
      didParseCell: (data: any) => {
        if (data.row.index === 4) {
          data.cell.styles.fillColor = accentColor
          data.cell.styles.textColor = [255, 255, 255]
          data.cell.styles.fontStyle = "bold"
          data.cell.styles.fontSize = 14
        }
        if (data.row.index === 3) {
          data.cell.styles.minCellHeight = 5
        }
      },
      margin: { left: 20, right: 20 },
    })

    yPosition = (doc as any).lastAutoTable.finalY + 20

    // Terms and Conditions
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 30
    }

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...primaryColor)
    doc.text(isSpanish ? "TÉRMINOS Y CONDICIONES" : "TERMS AND CONDITIONS", 20, yPosition)
    yPosition += 15

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...secondaryColor)

    const terms = isSpanish
      ? [
          "• Este presupuesto tiene una validez de 30 días desde la fecha de emisión.",
          "• Los precios están expresados en dólares estadounidenses (USD).",
          "• El tiempo estimado puede variar según la complejidad y cambios en los requerimientos.",
          "• Se requiere un anticipo del 50% para iniciar el proyecto.",
          "• Los pagos se realizarán según las fases acordadas del proyecto.",
          "• Cualquier funcionalidad adicional será cotizada por separado.",
          "• El cliente debe proporcionar todo el contenido necesario (textos, imágenes, etc.).",
          "• Se incluyen 2 rondas de revisiones por cada entregable.",
          "• El mantenimiento y hosting no están incluidos en este presupuesto.",
          "• Los derechos de autor se transfieren al cliente una vez completado el pago.",
        ]
      : [
          "• This budget is valid for 30 days from the date of issue.",
          "• Prices are expressed in US dollars (USD).",
          "• Estimated time may vary based on complexity and requirement changes.",
          "• A 50% advance payment is required to start the project.",
          "• Payments will be made according to the agreed project phases.",
          "• Any additional functionality will be quoted separately.",
          "• The client must provide all necessary content (texts, images, etc.).",
          "• 2 rounds of revisions are included for each deliverable.",
          "• Maintenance and hosting are not included in this budget.",
          "• Copyright is transferred to the client once payment is completed.",
        ]

    terms.forEach((term, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 30
      }
      doc.text(term, 20, yPosition, { maxWidth: 170 })
      yPosition += 8
    })

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(...secondaryColor)
      doc.text(`${isSpanish ? "Página" : "Page"} ${i} ${isSpanish ? "de" : "of"} ${pageCount}`, 20, 285)
      doc.text(
        isSpanish ? "Generado por Calculadora de Presupuestos Web" : "Generated by Web Budget Calculator",
        105,
        285,
        { align: "center" },
      )
      doc.text(new Date().toLocaleString(isSpanish ? "es-ES" : "en-US"), 190, 285, { align: "right" })
    }

    const pdfBuffer = doc.output("arraybuffer")

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="presupuesto-web-${new Date().toISOString().split("T")[0]}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Error al generar el PDF" }, { status: 500 })
  }
}
