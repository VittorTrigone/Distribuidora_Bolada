import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

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

  constructor(private clienteService: ClienteService,
    private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.formGroupCliente = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      price: ['', [Validators.required]],
      amont: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getCliente().subscribe(
      {
        next: data => this.clientes = data
      }
    );
  }

  save() {
    this.submitted = true;

    if (this.formGroupCliente.valid) {
      if (this.isEditing) {
        this.clienteService.update(this.formGroupCliente.value).subscribe(
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
        this.clienteService.save(this.formGroupCliente.value).subscribe(
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
    this.clienteService.delete(cliente).subscribe({
      next: () => this.loadClientes()
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }

  get name(): any {
    return this.formGroupCliente.get("name")
  }

  fecharModal() {
    this.modalService.dismissAll();
    this.formGroupCliente.reset();
    this.formGroupCliente.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
    this.submitted = false;
  }

}
