import { Component } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosService } from '../dados.service';

import { CnpjMaskPipe } from './cnpj-mask.pipe';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})

export class FornecedoresComponent {

  fornecedores: Fornecedor[] = [];
  isEditing: boolean = false;
  formGroupFornecedor: FormGroup;
  submitted: boolean = false;
  mostrarInput = false;

  checkboxClicked() {
    if (!this.mostrarInput) {
      this.mostrarInput = true;
    } else {
      this.mostrarInput = false;
    }
  }

  telefoneMask = '(00) 0 0000-0000';
  cnpjMask = '00.000.000/0000-00';

  constructor(
    private dadosService: DadosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {
    this.formGroupFornecedor = formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      endereco: ['', Validators.required],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      tForn: ['', [Validators.required]],
      termo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.dadosService.getFornecedor().subscribe(
      {
        next: data => this.fornecedores = data
      }
    );
  }

  save() {
    this.submitted = true;

    if (this.formGroupFornecedor.valid) {
      if (this.isEditing) {
        this.dadosService.updateForn(this.formGroupFornecedor.value).subscribe(
          {
            next: () => {
              this.loadFornecedores();
              this.modalService.dismissAll();
              this.formGroupFornecedor.reset();
              this.formGroupFornecedor.get('estado')?.setValue('');
              this.isEditing = false;
              this.submitted = false;
            }
          }
        )
      }
      else {
        this.dadosService.saveForn(this.formGroupFornecedor.value).subscribe(
          {
            next: data => {
              this.fornecedores.push(data);
              this.modalService.dismissAll();
              this.formGroupFornecedor.reset();
              this.formGroupFornecedor.get('estado')?.setValue('');
              this.submitted = false;
            }
          }
        )
      }
    }
  }

  edit(fornecedor: Fornecedor) {
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;
  }

  delete(fornecedor: Fornecedor) {
    this.dadosService.deleteForn(fornecedor).subscribe({
      next: () => this.loadFornecedores()
    })
  }

  open(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl' // Defina o tamanho desejado, por exemplo, 'xl' para extra large
    });
  }

  get name(): any {
    return this.formGroupFornecedor.get("name")
  }
  get email(): any {
    return this.formGroupFornecedor.get("email")
  }
  get cnpj(): any {
    return this.formGroupFornecedor.get("cnpj")
  }
  get telefone(): any {
    return this.formGroupFornecedor.get("telefone")
  }
  get endereco(): any {
    return this.formGroupFornecedor.get("endereco")
  }
  get estado(): any {
    return this.formGroupFornecedor.get("estado")
  }
  get cidade(): any {
    return this.formGroupFornecedor.get("cidade")
  }
  get tForn(): any {
    return this.formGroupFornecedor.get("tForn")
  }
  get termo(): any {
    return this.formGroupFornecedor.get("termo")
  }

  fecharModal() {
    this.modalService.dismissAll();
    this.formGroupFornecedor.reset();
    this.formGroupFornecedor.get('estado')?.setValue(''); // Define o valor do campo "estado" como vazio
    this.submitted = false;
  }
}
