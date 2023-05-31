import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../cliente';
import { DadosService } from '../dados.service';

import { CpfMaskPipe } from './cpf-mask.pipe';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  isEditing: boolean = false;
  formGroupCliente: FormGroup;
  submitted: boolean = false;

  cpfMask = '000.000.000-00';

  constructor(private dadosService: DadosService,
    private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.formGroupCliente = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      genero: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.dadosService.getCliente().subscribe(
      {
        next: data => this.clientes = data
      }
    );
  }

  save() {
    this.submitted = true;

    if (this.formGroupCliente.valid) {
      if (this.isEditing) {
        this.dadosService.updateCli(this.formGroupCliente.value).subscribe(
          {
            next: () => {
              this.loadClientes();
              this.modalService.dismissAll();
              this.formGroupCliente.reset();
              this.formGroupCliente.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
              this.isEditing = false;
              this.submitted = false;
            }
          }
        )
      }
      else {
        this.dadosService.saveCli(this.formGroupCliente.value).subscribe(
          {
            next: data => {
              this.clientes.push(data);
              this.modalService.dismissAll();
              this.formGroupCliente.reset();
              this.formGroupCliente.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
              this.submitted = false;
            }
          }
        )
      }
    }
  }

  edit(cliente: Cliente) {
    this.formGroupCliente.setValue(cliente);
    this.isEditing = true;
  }

  delete(cliente: Cliente) {
    this.dadosService.deleteCli(cliente).subscribe({
      next: () => this.loadClientes()
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }

  get name(): any {
    return this.formGroupCliente.get("name")
  }
  get email(): any {
    return this.formGroupCliente.get("email")
  }
  get cpf(): any {
    return this.formGroupCliente.get("cpf")
  }
  get genero(): any {
    return this.formGroupCliente.get("genero")
  }

  fecharModal() {
    this.modalService.dismissAll();
    this.formGroupCliente.reset();
    this.formGroupCliente.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
    this.submitted = false;
  }

}
