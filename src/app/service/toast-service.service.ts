import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  addSuccess(mensagem: string) {
    this.addToast('info', 'Info', mensagem);
  }

  addError(mensagem: string) {
    this.addToast('error', 'Erro', mensagem);
  }

  addInfo(mensagem: string) {
    this.addToast('info', 'Info', mensagem);
  }

  private addToast(tipo: string, titulo: string, mensagem: string) {
    this.messageService.add({
      severity: tipo,
      summary: titulo,
      detail: mensagem,
    });
  }
}
