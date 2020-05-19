FROM python:3.8-slim

RUN pip install poetry

ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

WORKDIR /api

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root

COPY . ./

ENV PYTHONPATH=/api

RUN poetry install && \
    mv hrsafindings_api.egg-info $VIRTUAL_ENV/lib/python3.8/site-packages/

EXPOSE 5000
