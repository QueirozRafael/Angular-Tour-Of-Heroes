import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //INFO O construtor é uma lista que já vem com as mensagens carregadas, o html só realiza a leitura.
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
