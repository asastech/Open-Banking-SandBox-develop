/*
 * Copyright 2018-2023 adorsys GmbH & Co KG
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version. This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 *
 * This project is also available under a separate commercial license. You can
 * contact us at psd2@adorsys.com.
 */

import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TestDataGenerationService {
  private baseUrl = `${environment.tppAdminBackend}`;

  constructor(private http: HttpClient) {}

  public generateTestData(currency: string, generatePaymentsFlag: boolean) {
    return this.http.get(this.baseUrl + '/data/generate/' + currency, {
      params: {
        generatePayments:
          generatePaymentsFlag === undefined
            ? 'false'
            : String(generatePaymentsFlag),
      },
      responseType: 'text',
    });
  }

  public generateExampleTestData(url: string) {
    return this.http.get(this.baseUrl + url, {
      responseType: 'text',
    });
  }

  public generateIban(userBranch: string) {
    return this.http.get(this.baseUrl + '/data/generate/iban', {
      params: {
        tppId: userBranch,
      },
      responseType: 'text',
    });
  }

  public generateTppId(countryCode: string) {
    return this.http.post(
      this.baseUrl + `/id?countryCode=${countryCode}`,
      countryCode,
      {
        responseType: 'text',
      }
    );
  }
}