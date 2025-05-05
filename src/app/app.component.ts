import { Component, Renderer2 } from '@angular/core';
import { Tenant } from './models/Tenant';
import { TenantConfig } from './models/tenantConfig';
import { TenantServiceService } from './services/tenant-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // <-- typo: `styleUrl` emas, `styleUrls` bo'lishi kerak
})
export class AppComponent {
  title = 'TRJ';
  tenantId: number = 0;
  tenant?: Tenant;
  config?: TenantConfig; // <-- Bu yerda const emas!
  error: string = '';
  backgroundColor: string = 'dark';

  constructor(private tenantService: TenantServiceService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadTenantData(this.tenantId);
  }

  loadTenantData(id: number): void {
    this.tenantService.getTenantsById(id).subscribe({
      next: (tenant) => {
        this.tenant = tenant;
        console.log('Tenant:', tenant);

        if (tenant?.configJson) {

          this.config = JSON.parse(tenant.configJson);
          console.log('Config:', this.config);

          this.applyTheme(this.config!.theme);
        }
      },
      error: () => this.error = 'Tenant not found'
    });
  }

  applyTheme(theme: string): void {
    if (theme === 'dark') {
      this.renderer.setStyle(document.body, 'background-color', 'black');
      this.renderer.setStyle(document.body, 'color', 'white');
    } else {
      this.renderer.setStyle(document.body, 'background-color', 'white');
      this.renderer.setStyle(document.body, 'color', 'black');
    }
  }
}
