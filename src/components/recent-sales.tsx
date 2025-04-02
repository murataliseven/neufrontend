import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ayşe Yılmaz</p>
          <p className="text-sm text-muted-foreground">
            ayse.yilmaz@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mehmet Kaya</p>
          <p className="text-sm text-muted-foreground">mehmet.kaya@email.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>ZD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Zeynep Demir</p>
          <p className="text-sm text-muted-foreground">
            zeynep.demir@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ali Şahin</p>
          <p className="text-sm text-muted-foreground">ali.sahin@email.com</p>
        </div>
        <div className="ml-auto font-medium">+₺99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>EÖ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Elif Öztürk</p>
          <p className="text-sm text-muted-foreground">
            elif.ozturk@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺2,499.00</div>
      </div>
    </div>
  )
} 