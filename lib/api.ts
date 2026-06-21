const API_URL = "https://diligent-overpay-stingray.ngrok-free.dev"

export async function createProject(data: any) {
    const response = await fetch(
        `${API_URL}/generate`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        }
    )

    const result = await response.json()

    console.log(result)

    return result
}