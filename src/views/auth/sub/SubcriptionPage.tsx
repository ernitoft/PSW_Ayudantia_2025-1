'use client'

import { Button } from "@/components/ui/button";
import { ApiBackend } from "@/data/axios";
import { useState } from "react";


interface CreatePaymentResponse {
    clientSecret: string;
    paymentIntentId: string;
    subscriptionId: number | null;
    paymentStatus: string;
}

interface SimulatePaymentResponse {
    paymentIntentId: string;
    status: string;
    amount: number;
    message: string;
}

export default function SubscriptionPage() {

    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState<string>("");
    const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
    const [status, setStatus] = useState<string>("");

    const [actualValueSub, setActualValueSub] = useState<number>(0);

    const handleSubscribe = async () => {
        setLoading(true);
        setStatus("");
        try {
            const result = await ApiBackend.post<CreatePaymentResponse>("Stripe/create-payment", {
                amount: 35000,
                Currency: "CLP",
            });

            setPaymentIntentId(result.data.paymentIntentId);
            setSubscriptionId(result.data.subscriptionId);
            setStatus(result.data.paymentStatus);

            const { data } = await ApiBackend.post<SimulatePaymentResponse>("Stripe/simulate-payment", {
                paymentIntentId: paymentIntentId
            });

            if (data.status === "succeeded") {
                setActualValueSub(data.amount);
                setStatus("Suscripción exitosa!");
            } else {
                setStatus(`Error al procesar el pago: ${data.message}`);
            }
        } catch (error: any) {
            console.error("Error durante la sub", error);
            setStatus(`Error al procesar la suscripción: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center bg-black text-white p-10 rounded shadow-lg h-full">
            <h1 className="text-2xl font-bold mb-4">Suscribirse al Premium</h1>
            <p className="mb-4">$35.000 CLP</p>

            <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                {loading ? "Cargando..." : "Pagar ahora"}
            </Button>

            {status && <p className="mt-4 text-center text-sm text-gray-400">{status}</p>}

            {paymentIntentId && (
                <div className="mt-2 text-sm text-green-400 text-center">
                    <p>Id de Pago:</p>
                    <code className="break-words">{paymentIntentId}</code>
                    <p>Id de la suscripción: {subscriptionId}</p>
                    <p>Valor de la suscripción: ${actualValueSub}</p>
                </div>
            )}
        </div>
    );
}