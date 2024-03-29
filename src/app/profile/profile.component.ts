import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';
import { NavbarService } from '../shared/services/navbar.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output() newCurrentUser: EventEmitter<string> = new EventEmitter();

  lesProfiles: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  prenom !: string
  nom !: string
  username !: string
  currentUser !: IUser
  profile !: string
  motDePasseConfirmeMajProfil !: string

  newPassword !: string
  messageNewPassword: string[] = []
  messageConfirmation: string = ""
  confirmationPassword !: string
  countMaj: number = 0
  erreurCaractere: boolean = true
  erreurTaille: boolean = true
  classe: string = ""
  classeConfirm: string = ""
  changerMotDePasse: boolean = false


  public formChangePassword!: FormGroup;


  constructor(private _authService: AuthService, private _modalService: NgbModal, private fb: FormBuilder,
    private toastr: ToastrService, private _router: Router, private _navbarService: NavbarService) { }

  ngOnInit(): void {
    this.currentUser = this._authService.getCurrentUtilisateur()
    this.prenom = this.currentUser.prenom
    this.nom = this.currentUser.nom
    this.username = this.currentUser.username
    this.profile = this.currentUser.profile
  }

  // permet d'ouvir les modals
  open(content: any) {
    this._modalService.open(content)
  }

  // changement de la photo de profil (choix multiple)
  changerProfil(numberProfile: string) {
    this.profile = numberProfile
  }

  // Appel du service navbar pour actualiser les informations
  newCurrentUserSignal(): void {
    this._navbarService.send();
  }

  // Permet de mettre à jour les informations utililisateurs
  majUser() {
    // on verifie le mot de passe
    this._authService.seConnecter(this.currentUser.username, this.motDePasseConfirmeMajProfil).subscribe({
      next: () => {

        // on reconstruit l'objet
        var user: IUser = {
          prenom: this.prenom,
          nom: this.nom,
          username: this.username,
          profile: this.profile,
          id: 0,
          roles: []
        }

        // envoist des informations user pour changement
        this._authService.majUser(user).subscribe({
          next: () => {
            // appel de seConnecter afin de récupéré un nouveau token JWT
            this._authService.seConnecter(this.currentUser.username, this.motDePasseConfirmeMajProfil).subscribe({
              next: jwt => {
                // stockage du token dans le localStorage
                var jwtFormat = jwt!.token
                localStorage.setItem('jwt', jwtFormat);
                // fermeture du modal et reset du form
                this._modalService.dismissAll()
                this.motDePasseConfirmeMajProfil = ""
                // envois d'un signal a la navbar pour refresh les informations
                this.newCurrentUserSignal()
                this.toastr.success('Compte mis à jour', '')
              },
            })
          },
          error: () =>
            this.toastr.error('Une erreur est survenue', '')
        })
      },
      error: () => {
        this.toastr.error('Mot de passe erroné')
      }
    })


  }

  // Permet le changement du mot de passe du compte
  changerDeMotDePasseSend() {

    if (this.erreurCaractere == false && this.erreurTaille == false) {
      if (this.newPassword == this.confirmationPassword) {

        this._authService.changePassword(this.newPassword).subscribe({
          next: () => {
            this.toastr.success('Mot de passe changé', '')
          },
          error: () =>
            this.toastr.error('Une erreur est survenue', '')
        })
      } else {
        this.toastr.error('Une erreur est survenue', '')
      }
    } else {
      this.toastr.error('Une erreur est survenue', '')
    }

  }

  // permet de verifier le nouveau mot de passe (assez long, avec les bons caratères)
  checkPassword() {

    this.changerMotDePasse = false

    if (this.newPassword.length <= 8) {
      if (this.messageNewPassword.some(x => x == "Mot de passe trop court") == false) {

        this.messageNewPassword.push("Mot de passe trop court")
        this.erreurTaille = true

      }
    } else {
      var index1 = this.messageNewPassword.indexOf("Mot de passe trop court")
      if (index1 != -1) {
        this.messageNewPassword.splice(index1);
        this.erreurTaille = false
      }
      this.erreurTaille = false

    }

    this.countMaj = 0
    for (let i = 0; i < this.newPassword.length; i++) {

      if (this.newPassword[i] === this.newPassword[i].toUpperCase()) {
        this.countMaj = this.countMaj + 1
      }
    }

    if (this.countMaj == 0) {
      if (this.messageNewPassword.some(x => x == "Le mot de passe doit contenir une majuscule ou un caractère spécial") == false) {
        this.messageNewPassword.push("Le mot de passe doit contenir une majuscule ou un caractère spécial")
        this.erreurCaractere = true
      }
    } else {
      var index2 = this.messageNewPassword.indexOf("Le mot de passe doit contenir une majuscule ou un caractère spécial")
      if (index2 != -1) {
        this.messageNewPassword.splice(index2);
        this.erreurCaractere = false
      }
      this.erreurCaractere = false

    }


    if (this.erreurCaractere) {
      this.classe = "is-invalid"
    }
    if (this.erreurTaille) {
      this.classe = "is-invalid"
    }
    if (this.erreurCaractere == false && this.erreurTaille == false) {
      this.classe = "is-valid"
    }
  }

  // permet de verifier la confirmation du nouveau mot de passe (doit correspondre au mot de passe ci dessus)
  confirmPassword() {
    this.changerMotDePasse = false

    if (this.erreurCaractere) {
      this.classeConfirm = "is-invalid"
      this.messageConfirmation = ""

    }
    if (this.erreurTaille) {
      this.classeConfirm = "is-invalid"
      this.messageConfirmation = ""
    }

    if (this.erreurCaractere == false && this.erreurTaille == false) {
      if (this.newPassword == this.confirmationPassword) {
        this.classeConfirm = "is-valid"
        this.changerMotDePasse = true

      } else {
        this.classeConfirm = "is-invalid"
        this.messageConfirmation = "Les mots de passe ne sont pas identiques"
      }
    }
  }
}
