import { ToastProps } from "@/components/ui/toast"

export const ERRORS_TOAST = {
  timeout: {
    variant: "destructive",
    title: "Une erreur c'est produite.",
    description: "Peut etre une bug venant de HiveMq.",
  } as ToastProps,
}

export const SUCCESS_TOAST = {
  login: {
    variant: "success",
    title: "Vous êtes connecté.",
    description: "Vous pouvez maintenant utiliser l'application.",
  } as ToastProps,
}
