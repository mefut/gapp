
const API_URL = process.env.API_URL
const TOKEN = process.env.TOKEN

export const fetchQuestions = async () => {
    try {
        const response = await fetch(`${API_URL}/items/Questions`, {
            headers: {
                // Authorization: TOKEN || ''
                'Authorization': `Bearer ${TOKEN || ''}`,
                'Content-Type': 'application/json',
                
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('Error fetching questions:', error)
        throw error
    }
}


export const fetchAnswers = async () => {
    try {
        const response = await fetch(`${API_URL}/items/Answers`, {
            headers: {
                Authorization: `upRBCJE0H_ClglHxe0G-DCChZH-M7cfC`
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Fetched Answers:', data)
        return data.data
    } catch (error) {
        console.error('Error fetching answers:', error)
        throw error
    }
}

export const submitAnswers = async (answers: Record<string, string>) => {
    const reqAnswers = Object.values(answers).join(', ')
    try {
        const response = await fetch(`${API_URL}/items/Results?filter[combination][_eq]=${reqAnswers}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `upRBCJE0H_ClglHxe0G-DCChZH-M7cfC`
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error submitting answers:', error)
        throw error
    }
}
