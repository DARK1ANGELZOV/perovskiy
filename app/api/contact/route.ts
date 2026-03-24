import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, area } = await request.json()

    // Отправка данных в Google Sheets через Apps Script
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwAWZrpCQ59CTQej6ITSZ3FQfckZTOZ9_yz-v1YmVI9XYzSM7zU8AQ0B9dbBu3jp5m9/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          area: area || '',
          timestamp: new Date().toISOString(),
        }),
      }
    )

    const result = await response.json()

    if (result.status === "success") {
      return NextResponse.json({ status: 'success', message: 'Заявка отправлена' })
    } else {
      throw new Error(result.message || 'Ошибка записи в таблицу')
    }
  } catch (error) {
    console.error('Ошибка обработки заявки:', error)
    return NextResponse.json({ status: 'error', message: 'Ошибка сервера' }, { status: 500 })
  }
}