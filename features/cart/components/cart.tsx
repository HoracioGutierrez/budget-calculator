import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/components/card";

const Cart = () => {
    return (
        <Card className="hidden md:block border-muted-foreground/20 min-w-sm">
            <CardHeader>
                <CardTitle>Cart</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-muted-foreground">Item</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Cart;