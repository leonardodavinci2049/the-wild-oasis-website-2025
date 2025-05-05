"use client";

import React from "react";
import ButtonFilter from "./ButtonFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  /*   Este hook recupera os parâmetros da URL atual. No seu caso, ele está sendo usado para:

    1 - Ler o parâmetro capacity da URL (const activeFilter = searchParams.get("capacity") ?? "all")
    2 - Determinar qual botão de filtro deve estar ativo com base no valor desse parâmetro */
  const searchParams = useSearchParams();
  /* Este hook fornece acesso ao objeto router do Next.js, que permite navegar programaticamente entre páginas. No seu componente, ele é usado para:
    1 - Atualizar a URL quando um filtro é selecionado (router.replace(...))
    2 - Manter o estado da aplicação sincronizado com a URL */
  const router = useRouter();
  /* Este hook recupera o caminho atual da URL sem os parâmetros de consulta. No seu componente, ele é usado para:
  1 - Construir a nova URL quando um filtro é aplicado (${pathname}?${params.toString()})
  2 - Garantir que apenas os parâmetros de consulta sejam alterados, enquanto mantém o mesmo caminho base */
  const pathname = usePathname();
  /* Juntos, esses hooks permitem implementar uma estratégia de filtragem baseada em URL, o que torna possível:
    1 - Compartilhar links com filtros específicos
    2 - Usar os botões de navegação do navegador para voltar aos filtros anteriores
    3 - Manter o estado do filtro consistente durante a navegação
 */

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <ButtonFilter
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </ButtonFilter>
      <ButtonFilter
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </ButtonFilter>
      <ButtonFilter
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </ButtonFilter>
      <ButtonFilter
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </ButtonFilter>
    </div>
  );
};

export default Filter;
