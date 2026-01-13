
import { authClient } from "@/lib/auth-client";
import { AlertDialog, AlertDialogTitle, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogAction } from "./ui/alert-dialog";

interface UpgradeModalProps{
    open:boolean;
    onOpenChange: (open:boolean) => void
}

export const UpgradeModal = ({open, onOpenChange} : UpgradeModalProps) => {
    return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subscription to perform this action. upgrade to Pro to unlock all features.
                    </AlertDialogDescription>                    
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>authClient.checkout({slug:"pro"})}>
                        Upgrade Now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}