import { CanDeactivate } from '@angular/router'
import { OrderComponent } from './order.component'

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(orderComponent: OrderComponent): boolean {
    if (!orderComponent.isOrderCompleted()) {
      return confirm('Deseja desistir da compra?')
    }
    return true
  }
}
